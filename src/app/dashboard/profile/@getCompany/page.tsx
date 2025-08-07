"use client";
import CompanyLoader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useJobContext } from "@/context/compnay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Company = {
  id: string;
  name: string;
  logo: string;
  description: string;
};

type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
};
export const Page = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const { setJobCreated } = useJobContext();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`/api/getCompany`);
        const data = await res.json();

        if (data.company) {
          setJobCreated(true);
          setCompany(data.company);
          setReviews(data.reviews || []);
        } else {
          setCompany(null);
        }
      } catch{
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [setJobCreated]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <CompanyLoader />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-muted-foreground mb-2">
                No Company Found
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                You don t have a company registered yet.
              </p>
              <Link href="/dashboard">
                <Button variant="outline" className="cursor-pointer">
                  Go Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 mt-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <Image
              src={company.logo}
              alt={company.name}
              width={60}
              height={60}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold">{company.name}</h2>
              <p className="text-sm text-muted-foreground flex flex-wrap">
                {company.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-stretch sm:items-center mt-3">
            <Link href="/addJob" className="w-full sm:w-fit">
              <Button className="w-full sm:w-fit bg-primary text-white hover:bg-primary/90 cursor-pointer">
                Create a job
              </Button>
            </Link>
            <Link href="/companyJobs" className="w-full sm:w-fit">
              <Button className="w-full sm:w-fit bg-gray-200 text-foreground hover:bg-gray-300 cursor-pointer">
                View Company Jobs
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <Separator className="my-4" />
          <h3 className="text-lg font-semibold mb-2">Reviews</h3>

          {reviews.length > 0 ? (
            <>
              {visibleReviews.map((review) => (
                <div key={review.id} className="mb-4">
                  <p className="text-sm">⭐ {review.rating}/5</p>
                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                  <p className="text-xs text-right text-gray-500 italic">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                  <Separator className="my-2" />
                </div>
              ))}
              {reviews.length > 3 && (
                <div className="text-center mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowAllReviews((prev) => !prev)}
                  >
                    {showAllReviews ? "Show Less" : "Show More"}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
