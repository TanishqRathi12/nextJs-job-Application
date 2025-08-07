import { JobProvider } from "@/context/compnay";

export default function RootLayout({
  children,
  getCompany,
}: Readonly<{
  children: React.ReactNode;
  getCompany: React.ReactNode;
}>) {
  return (
    <JobProvider>
    <div className="flex flex-col lg:flex-row gap-6 p-4 w-full">
      <div className="w-full">{children}</div>
      <div className="w-full">{getCompany}</div>
    </div>
    </JobProvider>
  );
}
