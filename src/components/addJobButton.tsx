"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function JobFormButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    job_title: "",
    job_logo: "",
    job_description: "",
    job_employment_type: "",
    job_is_remote: false,
    job_city: "",
    job_location: "",
    job_salary: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, job_is_remote: e.target.checked }));
  };

  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch(`/api/createJob`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setMessage({ type: "success", text: "Job posted successfully!" });
        setFormData({
          job_title: "",
          job_logo: "",
          job_description: "",
          job_employment_type: "",
          job_is_remote: false,
          job_city: "",
          job_location: "",
          job_salary: "",
        });

        setTimeout(() => {
          setIsOpen(false);
          setIsLoading(false);
          setMessage(null);
          router.push("/dashboard/profile");
        }, 2000);
      } else {
        const data = await res.json();
        setMessage({
          type: "error",
          text: data?.error || "Failed to post job.",
        });
        setIsLoading(false);
      }
    } catch {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (isLoading) return;

    setFormData({
      job_title: "",
      job_logo: "",
      job_description: "",
      job_employment_type: "",
      job_is_remote: false,
      job_city: "",
      job_location: "",
      job_salary: "",
    });
    setMessage(null);
    setIsLoading(false);
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isLoading) {
      handleClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 cursor-pointer text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:scale-105 text-sm sm:text-base"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span className="hidden sm:inline">Post New Job</span>
        <span className="sm:hidden">Post Job</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-start sm:items-center justify-center p-2 sm:p-4 z-[9999] animate-fadeIn overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl border border-white/20 animate-slideUp my-4 sm:my-0">
            <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 rounded-t-2xl sm:rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent truncate">
                    Create Job Posting
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 hidden sm:block">
                    Share your opportunity with talented professionals
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className={`text-gray-400 hover:text-gray-600 transition-all duration-200 p-2 hover:bg-white/50 rounded-full backdrop-blur-sm ml-2 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="button"
                  disabled={isLoading}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
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
            </div>

            <div
              className={`px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 max-h-[70vh] sm:max-h-[75vh] overflow-y-auto scrollbar-hide ${
                isLoading ? "pointer-events-none opacity-70" : ""
              }`}
            >
              {isLoading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl sm:rounded-3xl">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
                      <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
                        Creating Job Post...
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Please wait while we process your request
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {message && (
                <div
                  className={`mb-4 sm:mb-6 px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl flex items-center gap-3 backdrop-blur-sm animate-fadeIn ${
                    message.type === "success"
                      ? "bg-emerald-50/80 text-emerald-800 border border-emerald-200/50"
                      : "bg-red-50/80 text-red-800 border border-red-200/50"
                  }`}
                >
                  {message.type === "success" ? (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-red-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  <span className="font-semibold text-sm sm:text-base">
                    {message.text}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
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
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6V4m0 2v2a2 2 0 002 2m0 0h4a2 2 0 002-2M8 8v0"
                      />
                    </svg>
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="job_title"
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full border-0 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/70 transition-all duration-200 text-gray-900 placeholder-gray-500 shadow-sm text-sm sm:text-base"
                    value={formData.job_title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
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
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Company Logo URL
                    </label>
                    <input
                      type="url"
                      name="job_logo"
                      placeholder="https://company.com/logo.png"
                      className="w-full border-0 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/70 transition-all duration-200 text-gray-900 placeholder-gray-500 shadow-sm text-sm sm:text-base"
                      value={formData.job_logo}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
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
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Employment Type *
                    </label>
                    <select
                      name="job_employment_type"
                      className="w-full border-0 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/70 transition-all duration-200 text-gray-900 shadow-sm text-sm sm:text-base"
                      value={formData.job_employment_type}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          job_employment_type: e.target.value,
                        }))
                      }
                      required
                    >
                      <option value="">Select employment type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
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
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                      Annual Salary
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 sm:left-6 top-3 sm:top-4 text-gray-500 font-medium">
                        ₹
                      </span>
                      <input
                        type="number"
                        name="job_salary"
                        placeholder="1200000"
                        className="w-full border-0 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl pl-10 sm:pl-12 pr-4 py-3 sm:pr-6 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/70 transition-all duration-200 text-gray-900 placeholder-gray-500 shadow-sm text-sm sm:text-base"
                        value={formData.job_salary}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      City
                    </label>
                    <input
                      type="text"
                      name="job_city"
                      placeholder="e.g. Bangalore"
                      className="w-full border-0 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/70 transition-all duration-200 text-gray-900 placeholder-gray-500 shadow-sm text-sm sm:text-base"
                      value={formData.job_city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    Location Details
                  </label>
                  <input
                    type="text"
                    name="job_location"
                    placeholder="e.g. Manyata Tech Park, Hebbal"
                    className="w-full border-0 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/70 transition-all duration-200 text-gray-900 placeholder-gray-500 shadow-sm text-sm sm:text-base"
                    value={formData.job_location}
                    onChange={handleChange}
                  />
                </div>

                <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-100/50">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <input
                      type="checkbox"
                      id="job_is_remote"
                      checked={formData.job_is_remote}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="job_is_remote"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-800">
                          Remote Work Available
                        </div>
                        <div className="text-xs text-gray-500 hidden sm:block">
                          Enable flexible work arrangements
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Job Description *
                  </label>
                  <textarea
                    name="job_description"
                    rows={5}
                    placeholder="Describe the role, responsibilities, requirements, qualifications, and any other relevant details..."
                    className="w-full border-0 bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white/70 transition-all duration-200 resize-none text-gray-900 placeholder-gray-500 shadow-sm text-sm sm:text-base"
                    value={formData.job_description}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-gray-500 flex items-start gap-1">
                    <svg
                      className="w-3 h-3 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="hidden sm:inline">
                      Provide a detailed description to attract the right
                      candidates
                    </span>
                    <span className="sm:hidden">
                      Provide detailed job description
                    </span>
                  </p>
                </div>
              </form>
            </div>

            <div className="bg-gradient-to-r from-gray-50/80 to-blue-50/80 backdrop-blur-sm border-t border-gray-200/50 px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 rounded-b-2xl sm:rounded-b-3xl">
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className={`w-full sm:w-auto px-6 sm:px-8 py-3 text-gray-700 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl sm:rounded-2xl hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-gray-500/50 transition-all duration-200 font-semibold shadow-sm text-sm sm:text-base ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full sm:w-auto px-8 sm:px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl sm:rounded-2xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base ${
                    isLoading
                      ? "opacity-75 cursor-not-allowed transform-none hover:scale-100"
                      : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="hidden sm:inline">Creating...</span>
                      <span className="sm:hidden">Creating...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="hidden sm:inline">
                        Create Job Posting
                      </span>
                      <span className="sm:hidden">Create Job</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 640px) {
          .animate-slideUp {
            animation: slideUpMobile 0.4s ease-out forwards;
          }

          @keyframes slideUpMobile {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        }
      `}</style>
    </>
  );
}
