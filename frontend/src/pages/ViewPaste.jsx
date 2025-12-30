import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPaste } from "../api/pastes";

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPaste(id)
      .then((res) => setContent(res.data.content))
      .catch(() => setError("Paste not found or expired"));
  }, [id]);

  /* ---------- ERROR STATE ---------- */
  if (error) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-white border border-blue-200 rounded-md shadow-sm p-8 text-center">
          <p className="text-sm font-medium text-blue-700 mb-1">Error</p>
          <h1 className="text-lg font-semibold text-blue-900 mb-3">
            Unable to load paste
          </h1>
          <p className="text-sm text-blue-700 mb-6">
            {error}
          </p>

          <Link
            to="/"
            className="inline-block bg-blue-800 text-white px-5 py-2 text-sm
            font-medium rounded-md hover:bg-blue-700 transition"
          >
            Go to Create Paste
          </Link>
        </div>
      </div>
    );
  }

  /* ---------- SUCCESS STATE ---------- */
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">

        <div className="mb-6">
          <h1 className="text-xl font-semibold text-blue-900">
            View Paste
          </h1>
          <p className="text-sm text-blue-700">
            Read-only paste content
          </p>
        </div>

        <div className="bg-white border border-blue-200 rounded-lg shadow-md p-6">
          <pre
            className="bg-blue-50 border border-blue-200 rounded-md p-4
            text-sm font-mono text-blue-900 whitespace-pre-wrap break-words
            max-h-[70vh] overflow-y-auto"
          >
            {content}
          </pre>
        </div>

        <div className="mt-6">
          <Link
            to="/"
            className="text-sm font-medium text-blue-800 hover:underline"
          >
            ← Back to Create Paste
          </Link>
        </div>

      </div>
    </div>
  );
}
