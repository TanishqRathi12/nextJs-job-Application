"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Briefcase, DollarSign, Filter, MapPin, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

  const [isCollapsed, setIsCollapsed] = useState(false);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (title) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        handleSubmit();
      }, 2000);
    }
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [title, filters]);

  const handleChange = (
    field: keyof FilterState,
    value: string | boolean | null
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
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

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.job_salary) count++;
    if (filters.job_location) count++;
    if (filters.job_is_remote !== null) count++;
    return count;
  };

  const clearFilter = (filterType: keyof FilterState) => {
    const newFilters = { ...filters };
    if (filterType === "job_is_remote") {
      newFilters[filterType] = null;
    } else {
      newFilters[filterType] = "";
    }
    setFilters(newFilters);
  };

  return (
    <div className="w-full md:w-80">
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-between bg-white border-gray-200 hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {getActiveFiltersCount() > 0 && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
        </Button>
      </div>

      <Card
        className={`bg-white border-0 shadow-sm rounded-2xl overflow-hidden ${
          isCollapsed ? "hidden md:block" : "block"
        }`}
      >
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Filter className="w-5 h-5 text-blue-600" />
            Filter Jobs
            {getActiveFiltersCount() > 0 && (
              <span className="bg-blue-100 text-blue-700 text-xs ml-auto px-2 py-1 rounded-full font-medium">
                {getActiveFiltersCount()} active
              </span>
            )}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  Minimum Salary (₹)
                </Label>
                {filters.job_salary && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => clearFilter("job_salary")}
                    className="h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
              <Input
                placeholder="e.g. 50000"
                type="number"
                name="min_salary"
                value={filters.job_salary}
                onChange={(e) => handleChange("job_salary", e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg bg-gray-50 focus:bg-white transition-all"
              />
              {filters.job_salary && (
                <div className="text-xs text-gray-500">
                  Showing jobs with salary ≥ ₹
                  {parseInt(filters.job_salary).toLocaleString()}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  Job Location
                </Label>
                {filters.job_location && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => clearFilter("job_location")}
                    className="h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
              <Input
                placeholder="e.g. Mumbai, Delhi, Bangalore"
                name="job_location"
                value={filters.job_location}
                onChange={(e) => handleChange("job_location", e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg bg-gray-50 focus:bg-white transition-all"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  Work Mode
                </Label>
                {filters.job_is_remote !== null && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => clearFilter("job_is_remote")}
                    className="h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
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
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                  <RadioGroupItem
                    value="true"
                    id="remote"
                    className="text-blue-600"
                  />
                  <Label
                    htmlFor="remote"
                    className="text-sm text-gray-700 cursor-pointer flex-1"
                  >
                    Remote
                  </Label>
                  <span className="text-xs text-green-600 border border-green-200 bg-green-50 px-2 py-1 rounded-md">
                    Remote
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                  <RadioGroupItem
                    value="false"
                    id="onsite"
                    className="text-blue-600"
                  />
                  <Label
                    htmlFor="onsite"
                    className="text-sm text-gray-700 cursor-pointer flex-1"
                  >
                    On-site
                  </Label>
                  <span className="text-xs text-blue-600 border border-blue-200 bg-blue-50 px-2 py-1 rounded-md">
                    Austin
                  </span>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all"
                onClick={handleSubmit}
              >
                Apply Filters
              </Button>
              <Button
                variant="outline"
                className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-700 py-2.5 rounded-lg transition-all"
                onClick={handleReset}
              >
                Reset All
              </Button>
            </div>
          </div>

          {getActiveFiltersCount() > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <div className="text-xs font-medium text-gray-500 mb-2">
                Active Filters:
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.job_salary && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-md font-medium">
                    Salary: ₹{parseInt(filters.job_salary).toLocaleString()}+
                  </span>
                )}
                {filters.job_location && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-md font-medium">
                    Location: {filters.job_location}
                  </span>
                )}
                {filters.job_is_remote !== null && (
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-md font-medium">
                    {filters.job_is_remote ? "Remote" : "On-site"}
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FilterSidebar;
