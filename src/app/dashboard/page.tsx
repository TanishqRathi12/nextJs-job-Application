import Card from "@/components/Card";
import { Job } from "@prisma/client";


const getJobs = async () => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/getAllJobs`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(err);
  }
};

const page = async() => {
  const data = await getJobs();
  return (
    <>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-5 lg:mx-44 lg:my-12 mt-4">
        {data?.jobs?.map((item:Job) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </>
  );
};

export default page;
