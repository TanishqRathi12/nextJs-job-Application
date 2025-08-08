import CompanyReviewSection from "@/components/reviewSection";
import { Company, Job } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";


const jobDetail = async (
  id: string
): Promise<{ job: Job; company: Company} | undefined> => {
  try {
    const res = await fetch(`/api/detail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const details = await res.json();
    return { job: details.jobDetail, company: details.companyDetail };
  } catch (error) {
    console.log(error);
  }
};

export default async function Page({ params }: { params: Promise<{id: string}>}) {
  const {id} = await params;
  const {job, company } = await jobDetail(id) || { job: undefined, company: undefined };
  console.log(job, company);
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
              {job?.job_title}
            </h1>
            <p className="text-gray-600 mt-1 flex flex-wrap items-center gap-2">
              <span className="font-medium">{company?.name}</span>
              <span>•</span>
              <span>{job?.job_city}</span>
              <span>•</span>
              <span>{job?.job_location}</span>
            </p>
          </div>
          {job?.job_logo && (
            <Image
              src={job?.job_logo}
              alt={"Company Logo"}
              width={80}
              height={80}
              className="w-20 h-20 object-contain rounded"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
            {job?.job_employment_type}
          </span>
          <span
            className={`px-3 py-1 rounded-full ${
              job?.job_is_remote
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {job?.job_is_remote ? "Remote" : "On-site"}
          </span>
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
            Publisher: {job?.job_publisher}
          </span>
          <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
            Posted: {new Date(job?.createdAt || "").toLocaleDateString()}
          </span>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            Job Description
          </h2>
          <p className="text-gray-700">{job?.job_description}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-gray-900">Salary</h2>
          <p className="text-gray-700 font-medium">
            ₹{job?.job_salary?.toLocaleString()}
          </p>
        </section>
        <section>
          <CompanyReviewSection companyId={company?.id || ""} jobId={job?.id || ""} />
        </section>
      </div>
    </div>
  );
}
