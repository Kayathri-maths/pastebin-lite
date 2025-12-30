import { useState } from "react";
import { Copy, Share2, Check } from "lucide-react";
import { createPaste } from "../api/pastes";
export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const submit = async () => {
    setError("");
    setResult("");

    try {
      const body = { content };

      if (ttl) body.ttl_seconds = Number(ttl);
      if (maxViews) body.max_views = Number(maxViews);

     
      const res = await createPaste(body);
      setResult(res.data.url);
  
    } catch (err) {
      setError("Invalid input or server error",err);
    }
  };


  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Pastebin Link",
          url: result
        });
      } catch (err) {
        console.log("Share cancelled", err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
   <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left Column - Create New Paste */}
        <div>
          <h1 className="text-2xl font-bold text-blue-900 mb-6">Create New Paste</h1>
          <div className="bg-white rounded-lg shadow-md border border-blue-200 p-6">
        
            <div className="mb-6">
              <label className="block text-sm font-semibold text-blue-900 mb-2">Content</label>
              <textarea
                className="w-full border border-blue-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none bg-blue-50"
                placeholder="Paste your code or text here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
              />
            </div>
         
            <div className="mb-6">
              <label className="block text-sm font-semibold text-blue-900 mb-2">Expiration (seconds) - Optional</label>
              <input
                type="number"
                placeholder="e.g., 3600 for 1 hour"
                className="w-full border border-blue-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={ttl}
                onChange={(e) => setTtl(e.target.value)}
              />
              <p className="text-xs text-blue-600 mt-1">Leave empty for no expiration</p>
            </div>
           
            <div className="mb-6">
              <label className="block text-sm font-semibold text-blue-900 mb-2">Max Views - Optional</label>
              <input
                type="number"
                placeholder="e.g., 10"
                className="w-full border border-blue-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={maxViews}
                onChange={(e) => setMaxViews(e.target.value)}
              />
              <p className="text-xs text-blue-600 mt-1">Leave empty for unlimited views</p>
            </div>
         
            <button
              onClick={submit}
              disabled={!content.trim()}
              className="w-full bg-blue-800 text-white py-3 px-6 rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 disabled:cursor-not-allowed font-semibold transition-all cursor-pointer"
            >
              Create Paste
            </button>
    
            {error && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-300 rounded-lg">
                <p className="text-blue-700 text-sm">{error}</p>
              </div>
            )}
          </div>
        </div>
        {/* Right Column - Your Paste */}
        <div>
          <h1 className="text-2xl font-bold text-blue-900 mb-6">Your Paste</h1>
          <div className="bg-white rounded-lg shadow-md border-2 border-dashed border-blue-300 p-6 min-h-96">
            {!result ? (
              <div className="flex items-center justify-center h-full min-h-80">
                <p className="text-blue-400 text-center">Your paste details will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-3">✓ Paste created successfully!</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-blue-900 mb-1">Shareable URL</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={result}
                          readOnly
                          className="flex-1 bg-white border border-blue-300 rounded-md px-3 py-2 text-sm font-mono text-blue-900"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-blue-600 rounded-md hover:bg-blue-50 transition-all text-blue-700 font-medium text-sm cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy Link
                          </>
                        )}
                      </button>
                      <button
                        onClick={shareUrl}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-all font-medium text-sm cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
                {/* Paste Details */}
                <div className="space-y-3">
                  <div className="border-b border-blue-200 pb-2">
                    <h3 className="text-sm font-semibold text-blue-900">Paste Details</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                 
                    {ttl && (
                      <div className="flex justify-between">
                        <span className="text-blue-700">Expires in:</span>
                        <span className="font-medium text-blue-900">{ttl} seconds</span>
                      </div>
                    )}
                    {maxViews && (
                      <div className="flex justify-between">
                        <span className="text-blue-700">Max views:</span>
                        <span className="font-medium text-blue-900">{maxViews} views</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-blue-700">Content length:</span>
                      <span className="font-medium text-blue-900">{content.length} characters</span>
                    </div>
                  </div>
                </div>
                {/* Preview */}
                <div className="space-y-2">
                  <div className="border-b border-blue-200 pb-2">
                    <h3 className="text-sm font-semibold text-blue-900">Preview</h3>
                  </div>
                  <div className="bg-blue-50 rounded-md p-3 max-h-61 overflow-y-auto">
                    <pre className="text-xs font-mono text-blue-900 whitespace-pre-wrap break-words">{content}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}