"use client";
import Card from "@/components/Card";
import { Job } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import CommonLoader from "@/components/commonLoader";
import CommonError from "@/components/commonError";

const Page = () => {
  const getJobs = async () => {
    try {
      const res = await fetch(`/api/getAllJobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("failed to fetch jobs");
      }
      return res.json();
    } catch (err) {
      console.log(err);
    }
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if(isLoading){
    return <CommonLoader/>
  }

  if(isError){
    return <CommonError/>
  }

  return (
    <>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-5 lg:mx-44 lg:my-12 mt-4">
        {data?.jobs?.map((item: Job) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default Page;
