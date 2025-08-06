"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Review = {
  id: number;
  comment: string;
  rating: number;
};

export default function CompanyReviewSection({
  companyId,
  jobId,
}: {
  companyId: string;
  jobId: string;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/getReview`, {
          method: "POST",
          body: JSON.stringify(companyId),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [companyId]);

  const handleApply = async (jobId: string) => {
    try {
      setApplyLoading(true);
      const res = await fetch(`/api/applyJob`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data?.message || "Application submitted successfully!");
      } else {
        setMessage(
          data?.message || "Failed to apply for the job. Please try again."
        );
      }
    } catch (error) {
      setMessage("An unexpected error occurred while applying.");
    } finally {
      setApplyLoading(false);
    }
  };

  const handleSubmit = async () => {
    setMessage(null);
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/createReview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, rating, comment }),
      });

      const data = await res.json();

      if (res.ok) {
        const newReview = {
          id: Date.now(),
          comment,
          rating,
        };

        setReviews((prev) => [newReview, ...prev]);
        setMessage("Review submitted successfully!");
        setComment("");
        setRating(5);
        setIsOpen(false);
      } else {
        setMessage(data?.error || "Failed to submit review");
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-6">
      <button
        onClick={() => handleApply(jobId)}
        className="px-6 cursor-pointer m-3 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300"
        disabled={applyLoading}
      >
        {applyLoading ? "Submitting..." : "Apply Now"}
      </button>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-block px-5 py-2 cursor-pointer bg-blue-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-blue-700 transition duration-200"
      >
        Add Review
      </button>

      {message && (
        <p className="mt-4 text-sm text-center text-blue-600 font-medium">
          {message}
        </p>
      )}

      <section>
        <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
          Recent Reviews
        </h2>
        {isLoading ? (
          <p className="text-gray-600">Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 border border-gray-200 p-4 rounded-lg"
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium text-gray-800">
                    Confidential Reviewer
                  </p>
                  <p className="text-yellow-500 text-sm">
                    {"⭐".repeat(review.rating)}
                  </p>
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No reviews yet. Be the first to add one!
          </p>
        )}
      </section>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                Add Review
              </Dialog.Title>
              <button onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  disabled={isSubmitting}
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star{r > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Comment
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                  disabled={isSubmitting}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-md hover:bg-blue-700 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
