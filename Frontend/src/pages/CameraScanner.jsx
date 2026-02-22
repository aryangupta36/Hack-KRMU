import Webcam from "react-webcam";
import { useRef, useState } from "react";

export default function CameraScanner({ setScreen, setCapturedImage }) {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);

  /* ================= CAMERA CAPTURE ================= */
  const capture = () => {
    try {
      if (!webcamRef.current) {
        setError("Camera not initialized");
        return;
      }

      const image = webcamRef.current.getScreenshot();

      if (!image) {
        setError("Failed to capture image");
        return;
      }

      setCapturedImage?.(image);
      setScreen("diagnosis");
    } catch (err) {
      setError(err.message);
    }
  };

  /* ================= GALLERY UPLOAD ================= */
  const handleGalleryUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const imageData = event.target?.result;
      if (imageData) {
        setCapturedImage?.(imageData);
        setScreen("diagnosis");
      }
    };

    reader.onerror = () => {
      setError("Failed to read file");
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">

      {/* CAMERA */}
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        screenshotQuality={0.8}
        videoConstraints={{
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        }}
        className="absolute inset-0 w-full h-full object-cover z-0"
        onUserMediaError={(error) => {
          setError(`Camera error: ${error.message}`);
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* TOP BAR (FIXED CLICK ISSUE) */}
      <div className="absolute top-0 w-full px-4 pt-6 flex justify-between items-center text-white z-50">
        <button
          onClick={() => setScreen("dashboard")}
          className="p-2 cursor-pointer"
        >
          <img src="Close.svg" alt="Close" />
        </button>

        <div className="text-center">
          <p className="font-semibold">Crop Diagnostics</p>
          <p className={`text-xs ${error ? "text-red-400" : "text-green-400"}`}>
            {error ? `● ERROR: ${error}` : "● READY TO SCAN"}
          </p>
        </div>

        <button className="text-xl">⚡</button>
      </div>

      {/* INSTRUCTION */}
      <div className="absolute top-24 w-full flex justify-center z-40">
        <div className="bg-black/60 text-white text-sm px-4 py-2 rounded-xl text-center max-w-xs">
          Point the camera at the affected area.
        </div>
      </div>

      {/* SCAN BOX */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
        <div className="w-64 h-80 border-2 border-green-400 border-dashed rounded-xl relative">
          <p className="absolute inset-0 flex items-center justify-center text-white/60 text-sm">
            ALIGN LEAF HERE
          </p>
          <div className="absolute inset-0 animate-pulse border border-green-500 rounded-xl" />
        </div>
      </div>

      {/* BOTTOM CONTROLS */}
      <div className="absolute bottom-8 w-full flex justify-around items-center text-white z-50">

        {/* GALLERY */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="text-xs hover:text-green-400"
        >
          GALLERY
        </button>

        {/* Hidden Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleGalleryUpload}
          className="hidden"
        />

        {/* CAMERA BUTTON */}
        <button
          onClick={capture}
          className="w-16 h-16 bg-green-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center active:scale-90 transition"
        >
          <img src="Camera.svg" alt="" className="w-10 h-10" />
        </button>

        {/* GUIDE */}
        <button className="text-xs">GUIDE</button>
      </div>
    </div>
  );
}
