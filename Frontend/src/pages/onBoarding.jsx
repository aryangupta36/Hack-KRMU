import { useState, useEffect } from "react";
import MapComponent from "../components/MapComponent";
import { register, login, setLocation, setLang } from "../api/api.js";

function OnBoarding1({ setView }) {
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    try {
      setLang(language);
    } catch (err) {
      console.error("Error", err);
    }
  }, [language]);

  const languages = ["English", "Kiswahili", "हिंदी (Hindi)", "Español"];

  return (
    <div className="min-h-screen bg-blue-0 flex items-center justify-center">
      <div
        className="
        w-full
        max-w-6xl
        bg-white
        rounded-2xl
        overflow-hidden
        grid
        md:grid-cols-2
      "
      >
        {/* LEFT PANEL (image only on desktop) */}
        <div className="hidden md:block">
          <img
            src="/crops.webp"
            alt="Crop"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="p-6 space-y-5 flex flex-col justify-center">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl">CropGuard</h1>
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              ?
            </button>
          </div>

          {/* Mobile image */}
          <img
            src="/crops.webp"
            alt="Crop"
            className="w-full h-40 object-cover rounded-lg md:hidden"
          />

          {/* Title */}
          <div>
            <h2 className="text-2xl font-bold">Grow Healthy Crops</h2>
            <p className="text-gray-600 mt-1">
              Identify plant diseases instantly and get expert advice in your
              language.
            </p>
          </div>

          {/* Language buttons */}
          <div className="space-y-2">
            <p className="font-medium">Choose your language:</p>

            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`
                  w-full
                  flex
                  justify-between
                  items-center
                  px-3
                  py-3
                  rounded-lg
                  border
                  transition
                  ${
                    language === lang
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
              >
                <span>{lang}</span>
                {language === lang && "✔"}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setView("onBoarding2")}
            className="w-full bg-green-500 text-white font-semibold py-4 rounded-xl text-lg"
          >
            Get Started →
          </button>

          <p className="text-center text-sm text-gray-500">
            STEP 1 OF 3
          </p>
        </div>
      </div>
    </div>
  );
}

function OnBoarding2({ setView }) {
  const [name, setName] = useState("");
  const [farm, setFarm] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!phone || !name) return;
    // login or register user based on phone number
    if (phone.length === 10) {
      register(name, phone);
    }
  }, [phone, name]);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm p-4 space-y-5">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <button onClick={() => setView("onBoarding1")} className="text-xl">
            ←
          </button>
          <h1 className="font-semibold text-lg">Profile Setup</h1>
        </div>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center space-y-2">
          <div className="relative w-28 h-28 rounded-full border-4 border-green-400 flex items-center justify-center bg-green-100">
            <span className="text-4xl text-gray-500">👤</span>

            <button className="absolute bottom-1 right-1 bg-green-500 w-7 h-7 rounded-full flex items-center justify-center text-white text-sm">
              <img src="Camera.svg" alt="Camera Icon" />
            </button>
          </div>
          <p className="text-sm text-gray-600">Add your photo</p>
        </div>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600">
            FULL NAME
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-3 rounded-xl border bg-white outline-none"
            required
          />
        </div>

        {/* Farm Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600">
            FARM NAME <span className="text-gray-400">(optional)</span>
          </label>
          <input
            value={farm}
            onChange={(e) => setFarm(e.target.value)}
            placeholder="e.g. Sunny Valley Farm"
            className="w-full p-3 rounded-xl border bg-white outline-none"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600">
            PHONE NUMBER
          </label>

          <div className="flex rounded-xl border bg-white overflow-hidden">
            <span className="px-3 flex items-center text-gray-500 border-r">
              +91
            </span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="712 345 6789"
              className="w-full p-3 outline-none"
              required
            />
          </div>

          <p className="text-xs text-gray-400">
            We'll use this to connect you with local experts.
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={() => setView("onBoarding3")}
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-full active:scale-95 transition"
        >
          Next →
        </button>

        {/* Step Indicator */}
        <div className="flex flex-col items-center space-y-1">
          <div className="flex space-x-2">
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
          </div>
          <p className="text-xs text-gray-400">STEP 2 OF 3</p>
        </div>
      </div>
    </div>
  );
}

function OnBoarding3({ setView, onFinish }) {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [map, setMap] = useState("");

  const detectLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude.toFixed(4));
      setLng(pos.coords.longitude.toFixed(4));
    });
  };

useEffect(() => {
  if (!lat || !lng) return;

  const sendLocation = async () => {
    try {
      await setLocation(lat, lng);
    } catch (err) {
      console.error("Error sending location:", err);
    }
  };

  sendLocation();
}, [lat, lng]);


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm p-4 space-y-5">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <button onClick={() => setView("onBoarding2")} className="text-xl">
            ←
          </button>
          <h1 className="font-semibold text-lg">Farm Location</h1>
        </div>

        {/* Map Image */}
        <div className="relative rounded-xl overflow-hidden">
          {map === "img" ? (
            <img
              src="/map.jpg"
              alt="Farm location"
              className="w-full h-44 object-cover"
            />
          ) : (
            <div className="rounded-xl overflow-hidden">
              <MapComponent lat={lat} lng={lng} />
            </div>
          )}

          {/* Zoom Buttons */}
          <div className="absolute right-2 top-2 flex flex-col space-y-1">
            <button className="bg-white w-8 h-8 rounded shadow">+</button>
            <button className="bg-white w-8 h-8 rounded shadow">−</button>
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="font-semibold text-lg">Where is your farm?</h2>
          <p className="text-sm text-gray-600">
            We use your location to provide weather alerts and pest outbreak
            warnings specific to your local area.
          </p>
        </div>

        {/* Detect Button */}
        <button
          onClick={detectLocation}
          className="w-full border-2 border-green-500 text-green-600 py-3 rounded-xl active:scale-95 transition font-medium"
        >
          📍 Detect My Location
        </button>

        {/* Divider */}
        <div className="flex items-center space-x-2 text-gray-400 text-xs">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span>OR ENTER MANUALLY</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Coordinates */}
        <div className="flex space-x-2">
          <input
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="0.0000"
            className="w-full p-3 rounded-xl border bg-white outline-none"
          />
          <input
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="0.0000"
            className="w-full p-3 rounded-xl border bg-white outline-none"
          />
        </div>

        {/* Info */}
        <div className="flex items-start space-x-2 bg-green-100 p-3 rounded-xl text-sm text-gray-700">
          <span>🟢</span>
          <p>
            Works offline. You can find these coordinates in your phone's camera
            settings for photos taken at the farm.
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={() => onFinish()}
          className="w-full bg-green-500 text-white font-semibold py-3 rounded-full active:scale-95 transition"
        >
          Save & Continue →
        </button>

        {/* Step */}
        <p className="text-center text-xs text-gray-400">STEP 3 OF 3</p>
      </div>
    </div>
  );
}

export default function OnBoardingSystem({ onFinish }) {
  const [view, setView] = useState("onBoarding1");
  return (
    <>
      {view === "onBoarding1" && <OnBoarding1 setView={setView} />}
      {view === "onBoarding2" && <OnBoarding2 setView={setView} />}
      {view === "onBoarding3" && (
        <OnBoarding3 setView={setView} onFinish={onFinish} />
      )}
    </>
  );
}
