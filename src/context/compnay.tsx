"use client";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

type JobContextType = {
  jobCreated: boolean;
  setJobCreated: Dispatch<SetStateAction<boolean>>;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  const [jobCreated, setJobCreated] = useState<boolean>(false);

  return (
    <JobContext.Provider value={{ jobCreated, setJobCreated }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = (): JobContextType => {
  const context = useContext(JobContext);
  if (!context)
    throw new Error("useJobContext must be used inside JobProvider");
  return context;
};
