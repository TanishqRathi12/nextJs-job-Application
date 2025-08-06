'use client';

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import FilterSidebar from "@/components/filter";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async (filters: any = {}) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/searchJob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: searchParams.get("title"), ...filters }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setJobs(data.jobs);
    } catch (err: any) {
      setError("Failed to fetch jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-8 lg:px-12 py-6 w-full max-w-screen-2xl mx-auto">
      {/* Sidebar */}
      <div className="w-full lg:max-w-xs">
        <div className="lg:sticky lg:top-24">
          <FilterSidebar onApplyFilter={fetchJobs} />
        </div>
      </div>

      {/* Main Job Grid */}
      <div className="w-full flex-1">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((item: any) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center mt-10">No jobs found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
