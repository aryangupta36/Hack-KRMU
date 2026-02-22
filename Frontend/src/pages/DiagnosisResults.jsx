import { useState } from "react";

export default function DiagnosisResults({ setScreen, image }) {
  const [data] = useState(() => {
    try {
      const stored = localStorage.getItem("latestDiagnosis");
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error("Invalid stored diagnosis:", err);
      return null;
    }
  });

  

  // Safe fallback values
  const disease = data?.disease || "No Diagnosis Found";
  const scientificName = data?.scientific_name || "Unknown";
  const confidence = data?.confidence ?? 0;
  const description = data?.description || "No description available.";
  const actionSteps =
    Array.isArray(data?.action_steps) && data.action_steps.length > 0
      ? data.action_steps
      : ["No action steps provided."];

  const percentage = confidence <= 1 ? confidence * 100 : confidence;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col">
        {/* Header */}

        <div className="relative p-4 flex items-center justify-center">
          {/* Centered Title */}
          <h1 className="font-semibold text-center">Diagnosis Results</h1>

          {/* Right Aligned Back Button */}
          <button
            className="absolute left-4 text-green-600 font-medium"
            onClick={() => setScreen("dashboard")}
          >
            ← Back
          </button>
        </div>

        <div className="px-4 space-y-4 flex-1 overflow-y-auto pb-24">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={image || "/leaf.jpg"}
              alt="Leaf"
              className="w-full h-44 object-cover"
            />
          </div>

          {/* Disease Info */}
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{disease}</h2>
              <div className="text-green-600 font-semibold flex items-center space-x-1">
                <span>{confidence}%</span>
              </div>
            </div>

            <p className="text-green-600 text-sm">{scientificName}</p>

            {/* Confidence Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-2">
            <h3 className="font-semibold text-green-700">About this disease</h3>
            <p className="text-sm text-gray-700">{description}</p>
          </div>

          {/* Action Steps */}
          <div className="bg-white p-4 rounded-xl shadow-sm space-y-3">
            <h3 className="font-semibold text-green-700">
              Immediate action steps
            </h3>

            {actionSteps.map((step, i) => (
              <div key={i} className="flex space-x-3">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700">{step}</p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => setScreen("camera")}
              className="flex-1 bg-gray-200 py-3 rounded-full font-medium"
            >
              New Scan
            </button>
            <button
              onClick={() => setScreen("action-plan")}
              className="flex-1 bg-green-500 text-white py-3 rounded-full font-semibold"
            >
              Full Advice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
