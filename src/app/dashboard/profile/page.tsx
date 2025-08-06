"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useJobContext } from "@/context/compnay";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCompanyForm() {
  const router = useRouter();
  const { jobCreated } = useJobContext();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

   const handleDelete = async () => {
    await fetch(`/api/deleteCompany`, { method: "DELETE" });
    router.push("/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch(`/api/createCompany`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.refresh();
      router.push("/dashboard");
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
    <>
      {jobCreated ? (
        <Card className="max-w-md mx-auto mt-10">
          <CardHeader>
            <CardTitle>Your Company</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-sm text-gray-600">
              You have already created a company.
            </div>
            <div className="flex gap-4">
              <Button
                className="w-fit cursor-pointer"
                onClick={() => router.push("/editCompany")}
                type="button"
              >
                Edit Your Company
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setOpen(true)}
                className="w-fit cursor-pointer"
              >
                Delete Company
              </Button>
            </div>
          </CardContent>
          <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden">
          <DialogHeader>
            <DialogTitle>Delete Company?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the company
              <br /><span className="text-destructive font-medium">
                All data related to this company will also be deleted.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={async () => {
                setOpen(false);
                await handleDelete();
              }}
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        </Card>
      ) : (
        <Card className="max-w-md mx-auto mt-10">
          <CardHeader>
            <CardTitle>Create Company</CardTitle>
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
                  required
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
                  required
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
                  required
                />
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                Create Company
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
