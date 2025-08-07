'use client';

import Card from "@/components/Card";
import { Job } from "@prisma/client";
import { useEffect, useState } from "react";
import FilterSidebar from "@/components/filter";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [jobs,setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  type FilterState = {
    job_title?: string;
    job_location?: string;
    job_is_remote?: boolean | null;
    job_salary?: string | number;
    salary?: string | number;
    title?: string;
  };


  const fetchJobs = useCallback(
    async (filters: FilterState & { title: string }) => {
      setLoading(true);
      setError("");
      try {
        const { job_is_remote, ...rest } = filters;
        const filterPayload = {
          ...rest,
          job_is_remote: job_is_remote === null ? undefined : job_is_remote,
        };
        const res = await fetch("/api/searchJob", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filterPayload),
        });
        const data = await res.json();
        setJobs(data.jobs);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      } catch{
        setError("Failed to fetch jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchJobs({ title: searchParams.get("title") || "" });
  }, [searchParams, fetchJobs]);
  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 md:px-8 lg:px-12 py-6 w-full max-w-screen-2xl mx-auto">

      <div className="w-full lg:max-w-xs">
        <div className="lg:sticky lg:top-24">
          <FilterSidebar onApplyFilter={fetchJobs} />
        </div>
      </div>

      <div className="w-full flex-1">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((item: Job) => (
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
