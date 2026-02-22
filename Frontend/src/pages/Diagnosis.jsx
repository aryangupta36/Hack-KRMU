import { useEffect, useState } from "react";

export default function Diagnosis({ setScreen, image }) {
  const imageSrc = image || "/placeholder.jpg";

  const [progress, setProgress] = useState(0);
  const [textStep, setTextStep] = useState(0);
  const [backendDone, setBackendDone] = useState(false);

  const steps = [
    "Detecting location and climate data",
    "Analyzing crop health indicators",
    "Matching with disease database",
    "Generating treatment advice",
  ];

  const [data] = useState(() => {
    try {
      const stored = localStorage.getItem("latestDiagnosis");
      return stored ? JSON.parse(stored) : null;
    } catch (err) {
      console.error("Invalid stored diagnosis:", err);
      return null;
    }
  });


  // useEffect(()=>{
  //   setScreen('diagnosis-result');
  // }, [data])

  


  // progress animation (min 5 seconds)
  useEffect(() => {
    let start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / 5000) * 100, 100);

      setProgress(pct);

      if (pct === 100) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // text animation loop
  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextStep(prev => (prev + 1) % steps.length);
    }, 1200);

    return () => clearInterval(textInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">

        <div className="flex items-center justify-center w-full ">
            <button onClick={() => setScreen("dashboard")} className="absolute left-4 top-4 text-gray-600 hover:text-gray-800">
              <img src="/Close.svg" alt="Close" className="w-8 h-8" />
            </button>
      <h2 className="font-semibold text-lg mb-4">
        Analyzing Diagnosis
      </h2>

        </div>

      {/* Image */}
      <div className="w-full max-w-sm rounded-xl overflow-hidden shadow relative">
        <img src={imageSrc} className="w-full h-56 object-cover" />

        {/* scanning line animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-1 bg-green-500 animate-scan"></div>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-xl font-bold mt-6 text-center">
        Identifying disease patterns...
      </h1>

      <p className="text-green-600 text-sm">
        Please don't close the app
      </p>

      {/* Progress */}
      <div className="w-full max-w-sm mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Overall Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white mt-6 p-4 rounded-xl w-full max-w-sm shadow">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <div
              className={`w-4 h-4 rounded-full border ${
                i < textStep
                  ? "bg-green-500 border-green-500"
                  : i === textStep
                  ? "border-green-500 animate-pulse"
                  : "border-gray-300"
              }`}
            />
            <p
              className={
                i <= textStep
                  ? "text-black"
                  : "text-gray-400"
              }
            >
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div className="bg-green-100 border border-green-300 p-4 mt-6 rounded-xl w-full max-w-sm">
        <p className="text-green-700 font-semibold mb-1">
          Farmer Tip
        </p>
        <p className="text-green-800 text-sm">
          Rotating crops prevents soil-borne diseases.
        </p>
      </div>

      {/* backend ready indicator */}
      {backendDone && (
        <p className="mt-4 text-green-600 font-semibold">
          Analysis complete ✓
        </p>
      )}

    </div>
  );
}
