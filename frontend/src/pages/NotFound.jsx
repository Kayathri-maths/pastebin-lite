import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white border border-blue-200 rounded-lg shadow-sm p-8">

        <div className="mb-6 text-center">
          <p className="text-sm font-medium text-blue-700 mb-1">
            Error 404
          </p>
          <h1 className="text-xl font-semibold text-blue-900">
            Page not found
          </h1>
        </div>

        <div className="border-t border-blue-200 mb-6" />

        <p className="text-sm text-blue-700 text-center mb-8">
          The page you’re trying to access doesn’t exist, or the URL may be incorrect.
        </p>

        <div className="flex justify-center gap-3">
          <Link
            to="/"
            className="bg-blue-800 text-white px-5 py-2 text-sm font-medium
            rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Go to Create Paste
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 text-sm font-medium border border-blue-300
            rounded-md text-blue-800 hover:bg-blue-50 transition cursor-pointer"
          >
            Go back
          </button>
        </div>

      </div>
    </div>
  );
}
