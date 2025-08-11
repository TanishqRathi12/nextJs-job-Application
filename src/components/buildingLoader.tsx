const CompanyLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="relative">
        <div className="w-16 h-20 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg relative overflow-hidden">
          <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-300 rounded-sm animate-pulse"></div>
          <div
            className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-sm animate-pulse"
            style={{ animationDelay: "0.3s" }}
          ></div>
          <div
            className="absolute top-6 left-2 w-2 h-2 bg-yellow-300 rounded-sm animate-pulse"
            style={{ animationDelay: "0.6s" }}
          ></div>
          <div
            className="absolute top-6 right-2 w-2 h-2 bg-yellow-300 rounded-sm animate-pulse"
            style={{ animationDelay: "0.9s" }}
          ></div>
          <div
            className="absolute top-10 left-2 w-2 h-2 bg-yellow-300 rounded-sm animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="absolute top-10 right-2 w-2 h-2 bg-yellow-300 rounded-sm animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-red-400 rounded-full animate-bounce h-4"></div>
        </div>

        <div className="w-20 h-2 bg-gray-400 rounded-b-lg -mt-1"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Loading Company
        </h3>
        <div className="flex items-center justify-center space-x-1">
          <span className="text-sm text-gray-500">Fetching details</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLoader;
