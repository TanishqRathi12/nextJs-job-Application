"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterState {
  job_salary: string;
  job_location: string;
  job_is_remote: boolean | null;
}

const FilterSidebar = ({
  onApplyFilter,
}: {
  onApplyFilter: (filters: FilterState & { title: string }) => void;
}) => {
  const searchParams = useSearchParams();
  const [title] = useState(searchParams.get("title") || "");
  const [filters, setFilters] = useState<FilterState>({
    job_salary: "",
    job_location: "",
    job_is_remote: null,
  });

  useEffect(() => {
    if (title) {
      onApplyFilter({ title, ...filters });
    }
  }, [title, filters, onApplyFilter]);

  const handleChange = (
    field: keyof FilterState,
    value: string | boolean | null
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onApplyFilter({ title, ...filters });
  };

  const handleReset = () => {
    const resetFilters = {
      job_salary: "",
      job_location: "",
      job_is_remote: null,
    };
    setFilters(resetFilters);
    onApplyFilter({ title, ...resetFilters });
  };

  return (
    <Card className="w-full md:w-72 p-4 bg-white rounded-xl shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Filter Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div>
            <Label className="text-sm font-medium">Minimum Salary (₹)</Label>
            <Input
              placeholder="e.g. 50000"
              type="number"
              name="min_salary"
              value={filters.job_salary}
              onChange={(e) => handleChange("job_salary", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Job Location</Label>
            <Input
              placeholder="e.g. Mumbai"
              name="job_location"
              value={filters.job_location}
              onChange={(e) => handleChange("job_location", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Work Mode</Label>
            <RadioGroup
              value={
                filters.job_is_remote === null
                  ? ""
                  : filters.job_is_remote
                  ? "true"
                  : "false"
              }
              onValueChange={(value) => {
                handleChange(
                  "job_is_remote",
                  value === "" ? null : value === "true"
                );
              }}
              className="space-y-2 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="remote" />
                <Label htmlFor="remote">Remote</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button className="w-full sm:w-auto sm:flex-1" type="submit">
              Apply
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto sm:flex-1"
              type="button"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
