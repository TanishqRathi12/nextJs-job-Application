"use client";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

interface itemProp {
  item: {
    id: string;
    job_title: string;
    job_location: string;
    job_logo: string | null;
    job_publisher: string;
    job_employment_type: string;
    job_is_remote: boolean;
    job_city: string;
    job_salary: number;
  };
}

const getPlaceholderImage = (company: string) => {
  const firstLetter = company.charAt(0).toUpperCase();
  return `https://via.placeholder.com/50/eeeeee/000000?text=${firstLetter}`;
};

interface applicantsData {
  id: string;
  name: string;
  email: string;
}

const Card = ({ item }: itemProp) => {
  const pathname = usePathname();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedBookmarks = localStorage.getItem("bookmarkedJobs");
      if (storedBookmarks) {
        const bookmarks = JSON.parse(storedBookmarks);
        setIsBookmarked(bookmarks.includes(item.id));
      }
    }
  }, [item.id]);

  const toggleBookmark = () => {
    const stored = localStorage.getItem("bookmarkedJobs");
    let bookmarks = stored ? JSON.parse(stored) : [];

    if (bookmarks.includes(item.id)) {
      bookmarks = bookmarks.filter((id: string) => id !== item.id);
      setIsBookmarked(false);
    } else {
      bookmarks.push(item.id);
      setIsBookmarked(true);
    }
    localStorage.setItem("bookmarkedJobs", JSON.stringify(bookmarks));
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/deleteJob`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setShowDeleteModal(false);
        router.push("/dashboard/profile");
      } else {
        console.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const fetchApplicants = async () => {
    try {
      setShowApplicantsModal(true);

      const res = await fetch(`/api/viewApplication`, {
        method: "POST",
        body: JSON.stringify({ jobId: item.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        return res.json();
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["applicants", item.id],
    queryFn: fetchApplicants,
    enabled: showApplicantsModal,
  });

  return (
    <div className="p-4 bg-white border rounded-md shadow transition-all duration-200 hover:shadow-lg hover:bg-gradient-to-r hover:from-yellow-50 hover:to-white">
      <Link href={`/details/${item.id}`} rel="noreferrer">
        <h3 className="text-lg font-semibold text-gray-800 hover:underline">
          {item.job_title}
        </h3>
      </Link>

      <div className="flex items-center gap-1">
        <span className="inline-block px-1.5 py-1 mt-2 text-xs font-bold text-green-600 bg-green-100 rounded-sm">
          {item.job_is_remote ? "Remote" : item.job_city}
        </span>
        <p className="mt-2 text-gray-500 text-sm">Salary: ₹{item.job_salary}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1">
          <img
            src={item.job_logo || getPlaceholderImage(item.job_publisher)}
            alt={item.job_publisher}
            width={500}
            height={500}
            className="w-8 h-8 mr-2 object-scale-down"
          />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {item.job_publisher}
            </p>
            <div className="flex items-center gap-1">
              {item.job_location !== "REMOTE" && (
                <MapPin size={16} className="w-4 h-4 text-gray-500" />
              )}
              <p className="text-xs text-gray-500">
                {item.job_location === "REMOTE"
                  ? "Worldwide"
                  : item.job_location}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {pathname === "/companyJobs" && (
            <>
              <button
                className="px-2 py-1 cursor-pointer text-xs bg-red-100 text-red-600 rounded hover:bg-red-200"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
              <button
                className="px-2 py-1 cursor-pointer text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setShowApplicantsModal(true)}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "View Applications"}
              </button>
            </>
          )}
          <button
            onClick={toggleBookmark}
            className="text-gray-400 cursor-pointer hover:text-gray-700"
          >
            {isBookmarked ? (
              <FaBookmark size={20} className="text-yellow-500" />
            ) : (
              <FaRegBookmark size={20} />
            )}
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center border overflow-hidden rounded-lg bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-xs w-full">
            <p className="mb-4 text-gray-800">
              Are you sure you want to delete this job?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 cursor-pointer py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 cursor-pointer py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showApplicantsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col transform transition-all duration-300 animate-in fade-in-0 zoom-in-95 border border-gray-100">
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Job Applicants
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {isLoading
                      ? "Loading applications..."
                      : `${data.application.length} ${
                          data?.application.length === 1
                            ? "application"
                            : "applications"
                        } received`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowApplicantsModal(false)}
                className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all duration-200 hover:scale-105 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 group-hover:text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin"></div>
                    <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin absolute top-0 left-0 border-t-transparent border-r-transparent"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
                    Loading Applications
                  </h3>
                  <p className="text-gray-500 text-center max-w-sm">
                    Please wait while we retrieve the latest applicant
                    information
                  </p>
                </div>
              ) : data.application.length > 0 ? (
                <div
                  className="overflow-y-auto px-6 py-2"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <div className="space-y-3">
                    {data.application.map(
                      (applicant: applicantsData) => (
                        <div
                          key={applicant.id}
                          className="group flex items-center space-x-4 p-4 rounded-xl bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-md transition-all duration-200"
                        >
                          <div className="relative">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                              <span className="text-white font-bold text-lg">
                                {applicant.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900 truncate text-lg">
                                {applicant.name}
                              </h3>
                            </div>
                            <p className="text-gray-600 truncate flex items-center space-x-1">
                              <svg
                                className="w-4 h-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 8l7.89 7.89a2 2 0 002.82 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                              <span>{applicant.email}</span>
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="h-4"></div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mb-6">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    No Applications Yet
                  </h3>
                  <p className="text-gray-500 text-center max-w-md leading-relaxed">
                    Once candidates start applying for this position, their
                    applications will appear here. You ll be able to review and
                    manage all submissions from this dashboard.
                  </p>
                </div>
              )}
            </div>

            {!isLoading && data.application.length > 0 && (
              <div className="flex items-center justify-between p-6 pt-4 border-t border-gray-100 bg-gray-50/50">
                <div className="text-sm text-gray-500">
                  Showing all applications
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowApplicantsModal(false)}
                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => alert("Export functionality coming soon")}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span>Export List</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
