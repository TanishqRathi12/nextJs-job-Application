export default function CommonLoader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div
        className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
}