"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col lg:flex-row border-b-2 border-white/30 justify-between items-center p-4 sm:p-5 lg:p-6 bg-gradient-to-r  shadow-sm">
      <Link href="/dashboard">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-sm">
            JOB DHOONDO.COM
          </h1>
        </div>
      </Link>

      <div className="flex flex-row items-center gap-2 sm:gap-3 w-auto mb-4 lg:mb-0">
        <label
          htmlFor="search"
          className="text-sm sm:text-base font-medium whitespace-nowrap"
        >
          Search:
        </label>
        <div className="relative w-full sm:w-80 lg:w-96">
          <form action="/dashboard/search" method="GET">
            <input
              type="text"
              id="search"
              name="title"
              placeholder="Search jobs, companies, locations..."
              className="w-full border-2 border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-2 sm:p-3 rounded-xl text-sm sm:text-base transition-all duration-200 shadow-sm"
            />
            <button
              className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2"
              type="submit"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center">
        {pathname === "/dashboard/profile" ? (
          <Link href={"/dashboard"}>
            <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded-lg text-sm sm:text-base font-medium text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md">
              <span className="bold">Back to Jobs</span>
            </button>
          </Link>
        ) : (
          <Link href={"/dashboard/profile"}>
            <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded-lg text-sm sm:text-base font-medium text-gray-700 transition-all duration-200 shadow-sm hover:shadow-md">
              <span className="bold">Profile</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
