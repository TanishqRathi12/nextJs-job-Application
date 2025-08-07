"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch(`/api/editCompany`, {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/dashboard/profile");
    } else {
      try {
        const data = await res.json();
        setError(data.message || "Something went wrong.");
      } catch {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <div className="flex items-center mb-2 ">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 cursor-pointer"
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path
                d="M12 15l-5-5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
        <CardTitle>Edit your company details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-sm text-gray-600">
          You can create only 1 company.
        </div>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="pb-2">
              Company Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="logo" className="pb-2">
              Logo URL
            </Label>
            <Input
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="description" className="pb-2">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="w-full cursor-pointer">
            Confirm
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Page;
