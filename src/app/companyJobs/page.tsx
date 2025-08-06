"use client";
import Card from "@/components/Card";
import { Job } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`/api/getCompanyJobs`);
        const result = await res.json();
        setData(result.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-blue-600 font-semibold text-xl">
        <div className="flex space-x-1 items-center">
          <span>Job Dhoondo</span>
          <motion.div className="flex space-x-1" animate="animate">
            <motion.span className="w-2 h-2 bg-blue-600 rounded-full" />
            <motion.span className="w-2 h-2 bg-blue-600 rounded-full" />
            <motion.span className="w-2 h-2 bg-blue-600 rounded-full" />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-start mb-4 pt-6  lg:mx-44">
        <Link href="/dashboard/profile">
          <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded-lg text-sm sm:text-base font-medium text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md">
            <span className="font-bold">Back to Profile</span>
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center w-full">
        <h2 className="text-2xl font-semibold text-gray-800 my-6">
          Here are the jobs you have created for your company.
        </h2>
      </div>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5 lg:mx-44 lg:my-12 mt-4">
        {data.map((item: any) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default Page;
