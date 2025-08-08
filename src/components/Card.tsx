"use client";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

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

interface Applicant {
  id: string;
  name: string;
  email: string;
}

const Card = ({ item }: itemProp) => {
  const pathname = usePathname();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const router = useRouter();
  console.log(applicants);

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
      const res = await fetch(`/api/viewApplication`, {
        method: "POST",
        body: JSON.stringify({ jobId: item.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        setApplicants(data.application);
      } else {
        setApplicants([]);
      }
      setShowApplicantsModal(true);
    } catch (err) {
      console.error("Error:", err);
      setApplicants([]);
    }
  };

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
                className="px-2 py-1 cursor-pointer text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                onClick={fetchApplicants}
              >
                View Applications
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
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/30 z-50 p-4">
          <div className="bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 w-full max-w-lg transform transition-all duration-300 animate-in fade-in-0 zoom-in-95">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Applicants
                  </h3>
                  <p className="text-sm text-gray-500">
                    {applicants.length}{" "}
                    {applicants.length === 1 ? "candidate" : "candidates"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowApplicantsModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100/80 hover:bg-gray-200/80 flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
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
            <div className="space-y-1">
              {applicants.length > 0 ? (
                <div className="max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {applicants.map((applicant, index) => (
                    <div
                      key={index}
                      className="group flex items-center space-x-4 p-4 rounded-xl bg-white/50 hover:bg-white/70 border border-transparent hover:border-white/40 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {applicant.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate group-hover:text-gray-900 transition-colors">
                          {applicant.name}
                        </h4>
                        <p className="text-sm text-gray-600 truncate group-hover:text-gray-700 transition-colors">
                          {applicant.email}
                        </p>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">
                    No Applications Yet
                  </h4>
                  <p className="text-sm text-gray-500">
                    Applications will appear here once candidates start
                    applying.
                  </p>
                </div>
              )}
            </div>

            {applicants.length > 0 && (
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200/50">
                <button
                  onClick={() => setShowApplicantsModal(false)}
                  className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-gray-100/80 hover:bg-gray-200/80 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Close
                </button>
                <button
                  onClick={() => alert("This feature available soon")}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Export List
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
