"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JobForm() {
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

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
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
        router.push("/dashboard/profile");
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data?.error || "Failed to post job." });
      }
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-8 border border-gray-200">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/dashboard/profile"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Profile
        </Link>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Post a New Job
      </h2>

      {/* Show message if present */}
      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="job_title"
              placeholder="e.g. Frontend Developer"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.job_title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Logo URL
            </label>
            <input
              type="text"
              name="job_logo"
              placeholder="e.g. https://company.com/logo.png"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.job_logo}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Employment Type
            </label>
            <select
              name="job_employment_type"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.job_employment_type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  job_employment_type: e.target.value,
                }))
              }
            >
              <option value="">Select type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="job_is_remote"
              checked={formData.job_is_remote}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-green-600"
            />
            <label htmlFor="job_is_remote" className="text-sm text-gray-700">
              Remote
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Salary (Annual)
            </label>
            <input
              type="number"
              name="job_salary"
              placeholder="e.g. 120000"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.job_salary}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="job_city"
              placeholder="e.g. Bangalore"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.job_city}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location Details
            </label>
            <input
              type="text"
              name="job_location"
              placeholder="e.g. Manyata Tech Park"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.job_location}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Description
          </label>
          <textarea
            name="job_description"
            rows={5}
            placeholder="Describe the job responsibilities, requirements, etc."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.job_description}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium text-lg"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}
