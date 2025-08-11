"use client";
import CommonError from "@/components/commonError";
import CommonLoader from "@/components/commonLoader";
import CompanyReviewSection from "@/components/reviewSection";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const jobDetail = async (id: string) => {
  try {
    const res = await fetch(`/api/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobDetail", id],
    queryFn: () => jobDetail(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  if (isError) {
    return <CommonError />;
  }
  if (isLoading) {
    return <CommonLoader />;
  }
  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-12 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <Link
          href={`/dashboard`}
          className="inline-flex items-center gap-2 text-sm sm:text-base px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-black transition duration-200 w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Jobs
        </Link>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.jobDetail.job_title}
            </h1>
            <p className="text-gray-600 mt-1 flex flex-wrap items-center gap-2">
              <span className="font-medium">{data?.companyDetail?.name}</span>
              <span>•</span>
              <span>{data?.jobDetail.job_city}</span>
              <span>•</span>
              <span>{data?.jobDetail.job_location}</span>
            </p>
          </div>
          {data?.jobDetail.job_logo && (
            <Image
              src={data?.jobDetail.job_logo}
              alt={"Company Logo"}
              width={80}
              height={80}
              className="w-20 h-20 object-contain rounded"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
            {data?.jobDetail.job_employment_type}
          </span>
          <span
            className={`px-3 py-1 rounded-full ${
              data?.jobDetail.job_is_remote
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {data?.jobDetail.job_is_remote ? "Remote" : "On-site"}
          </span>
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
            Publisher: {data?.jobDetail.job_publisher}
          </span>
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
            Posted: {new Date(data?.jobDetail.createdAt || "").toLocaleDateString()}
          </span>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            Job Description
          </h2>
          <p className="text-gray-700">{data?.jobDetail.job_description}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Salary</h2>
          <p className="text-gray-700 font-medium">
            ₹{data?.jobDetail.job_salary?.toLocaleString()}
          </p>
        </section>
        <section>
          <CompanyReviewSection
            companyId={data?.companyDetail?.id || ""}
            jobId={data?.jobDetail.id || ""}
          />
        </section>
      </div>
    </div>
  );
}
export default Page;
