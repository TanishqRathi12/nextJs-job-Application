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
import Company from "@/components/company";
import { Textarea } from "@/components/ui/textarea";

import { Separator } from "@/components/ui/separator";
import CommonError from "@/components/commonError";
import CommonLoader from "@/components/commonLoader";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  Building2, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  AlertTriangle,
  CheckCircle,
  Image,
  FileText,
  ExternalLink
} from "lucide-react";


export default function CreateCompanyForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeView, setActiveView] = useState<"company" | "other">("company");
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

  const fetchCompany = async () => {
    try {
      const res = await fetch(`/api/getCompany`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    } catch {
      console.log("something went wrong");
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["company"],
    queryFn: fetchCompany,
    staleTime: 1000 * 60 * 10,
  });

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <CommonLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <CommonError />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6 shadow-lg">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Company Management
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Create and manage your company profile with professional tools designed for modern businesses.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-xl gap-2 shadow-sm border p-1">
            <Button
              variant={activeView === "company" ? "default" : "ghost"}
              onClick={() => setActiveView("company")}
              className={`px-6 py-3 rounded-lg font-medium cursor-pointer transition-all duration-200 ${
                activeView === "company"
                  ? "bg-blue-600 hover:bg-blue-800 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Building2 className="h-4 w-4 mr-2" />
              Company Profile
            </Button>
            <Button
              variant={activeView === "other" ? "default" : "ghost"}
              onClick={() => setActiveView("other")}
              className={`px-6 py-3 rounded-lg cursor-pointer font-medium transition-all duration-200 ${
                activeView === "other"
                  ? "bg-blue-600 hover:bg-blue-800 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Settings className="h-4 w-4 mr-2" />
              Management
            </Button>
          </div>
        </div>

        {activeView === "company" ? (
          <>
            {data?.company ? (
              <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-gray-500 p-5 text-white rounded-t-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold">
                        {data.company.name}
                      </CardTitle>
                      <p className="text-green-100 text-sm mt-1 font-medium">
                        Company Active
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        <p className="text-blue-800 font-medium">
                          Your company profile is set up and ready!
                        </p>
                      </div>
                      <p className="text-blue-600 text-sm mt-1">
                        You can edit your company details or manage your business settings.
                      </p>
                    </div>

                    <Separator />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Button
                        className="h-14 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                        onClick={() => router.push("/editCompany")}
                        type="button"
                      >
                        <Edit3 className="h-4 w-4 mr-2" />
                        <div className="text-left">
                          <div className="font-medium">Edit Company</div>
                          <div className="text-xs opacity-90">Update details</div>
                        </div>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="h-14 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        onClick={() => setOpen(true)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        <div className="text-left">
                          <div className="font-medium">Delete Company</div>
                          <div className="text-xs opacity-70">Permanent action</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader className="text-center space-y-4">
                      <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                      <DialogTitle className="text-xl font-semibold">
                        Delete Company?
                      </DialogTitle>
                      <DialogDescription className="text-center">
                        This action cannot be undone. This will permanently delete
                        <br />
                        <span className="font-semibold text-red-600">
                          {data.company.name}
                        </span>
                        <br />
                        and all associated data.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={async () => {
                          setOpen(false);
                          await handleDelete();
                        }}
                      >
                        Delete Company
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Card>
            ) : (
              <div className="max-w-4xl mx-auto">
                <Card className="shadow-xl border-0 bg-white overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Plus className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-semibold">
                          Create Your Company
                        </CardTitle>
                        <p className="text-blue-100 mt-1">
                          Set up your business profile in just a few steps
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8">
                    <div className="mb-8">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <AlertTriangle className="h-4 w-4 text-amber-600" />
                        </div>
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                          One Company Policy
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        You can create only one company per account. Make sure to provide accurate information as this will represent your business across the platform.
                      </p>
                    </div>

                    {error && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                          <p className="text-red-800 font-medium text-sm">{error}</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-semibold text-gray-700 flex items-center">
                            <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                            Company Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Enter your company name"
                            value={formData.name}
                            onChange={handleChange}
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                          <p className="text-xs text-gray-500">
                            This will be your public company name
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="logo" className="text-sm font-semibold text-gray-700 flex items-center">
                            <Image className="h-4 w-4 mr-2 text-gray-500" />
                            Logo URL *
                          </Label>
                          <Input
                            id="logo"
                            name="logo"
                            placeholder="https://example.com/logo.png"
                            value={formData.logo}
                            onChange={handleChange}
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                          <p className="text-xs text-gray-500">
                            Direct link to your company logo image
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-gray-500" />
                          Company Description *
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="Describe your company, its mission, and what makes it unique..."
                          value={formData.description}
                          onChange={handleChange}
                          className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
                          required
                        />
                        <p className="text-xs text-gray-500">
                          Provide a compelling description of your business (minimum 20 characters)
                        </p>
                      </div>

                      <Separator />

                      <Button 
                        type="submit" 
                        className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Create Company Profile
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        ) : (
          <Company isError={isError} data={data} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}