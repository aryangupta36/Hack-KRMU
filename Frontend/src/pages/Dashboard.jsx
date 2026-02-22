import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { diagnose, getTranslations, getWeather } from "../api/api.js";

const data = [
  { name: "Treatment History", icon: "History.svg" },
  { name: "Market Prices", icon: "Prices.svg" },
];

export default function Dashboard({ setScreen, setCapturedImage }) {
  const fileInputRef = useRef(null);
  const [locationName, setLocationName] = useState("");
  const [weather, setWeather] = useState({
    temperature: null,
    condition: "Loading...",
    humidity: null,
    wind: null,
    rainPercent: null,
  });

  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Fetch translations immediately on mount
    (async () => {
      try {
        const tRes = await getTranslations();
        setTranslations(tRes.translations || {});
      } catch (e) {
        console.warn("Failed to load translations on mount", e);
      }
    })();

    // Get location and weather when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Get weather data (includes location name)
          const weatherData = await getWeather(latitude, longitude);
          setLocationName(weatherData?.location || "Unknown location");
          setWeather({
            temperature: weatherData?.temperature || "N/A",
            condition: weatherData?.condition || "N/A",
            humidity: weatherData?.humidity || "N/A",
            wind: weatherData?.wind || "N/A",
            rainPercent: weatherData?.rainPercent || "N/A",
          });
        } catch (err) {
          console.error("Failed to fetch location or weather:", err);
          setLocationName("Location unavailable");
          setWeather((prev) => ({
            ...prev,
            condition: "Weather unavailable",
          }));
        }
      });
    }
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Read image and navigate immediately to diagnosis screen
    if (setCapturedImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target.result);
        setScreen("diagnosis");
      };
      reader.readAsDataURL(file);
    } else {
      setScreen("diagnosis");
    }

    // Upload in background (App.jsx also runs diagnosis when capturedImage changes,
    // but keep background call for redundancy).
    diagnose(file)
  .then((res) => {
    const diagnosisData = res.data ?? res;

    console.log("Saving:", diagnosisData);

    localStorage.setItem(
      "latestDiagnosis",
      JSON.stringify(diagnosisData.action_plan)
    );
  })
  .catch((err) => console.warn("Background diagnose failed:", err));


  };

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* hidden file input for + button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={() => setScreen("profile")}
          className="flex items-center gap-3"
        >
          <img
            src="/image.png"
            className="w-12 h-12 rounded-full border-2 border-green-500"
            alt=""
          />
          <div>
            <p className="text-green-600 text-xs">
              {translations.welcomeBack || "WELCOME BACK"}
            </p>
            <h2 className="font-bold text-lg"> Arjun</h2>
          </div>
        </button>

        <div className="flex gap-3">
          <div className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
            <img src="/Overlay.svg" alt="" />
          </div>
          <div className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center">
            <img src="/Alert.svg" alt="" />
          </div>
        </div>
      </div>

      {/* Weather */}
      <div className="mx-4 bg-green-50 rounded-2xl p-4 shadow space-y-3">
        <p className="text-green-600">📍 {locationName}</p>
        <h1 className="text-3xl font-bold">
          {weather.condition}, {weather.temperature}°C ☀️
        </h1>

        <div className="flex justify-between bg-white rounded-xl p-3 text-center">
          <div>
            <p className="text-green-600 text-xs">HUMIDITY</p>
            <p className="font-semibold">{weather.humidity}%</p>
          </div>
          <div>
            <p className="text-green-600 text-xs">WIND</p>
            <p className="font-semibold">{weather.wind} km/h</p>
          </div>
          <div>
            <p className="text-green-600 text-xs">RAIN %</p>
            <p className="font-semibold">{weather.rainPercent}%</p>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <p className="text-green-700">
            {weather.humidity > 70
              ? "High humidity - ideal for pest growth. Monitor closely."
              : "Good conditions - ideal for spraying pesticides."}
          </p>
          <p className="text-green-600 font-semibold">7-Day Forecast</p>
        </div>
      </div>

      {/* Start Diagnosis */}
      <div className="mx-4 mt-4 bg-green-500 text-white rounded-2xl p-5 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-xl">
            {translations.startDiagnosis || "Start Diagnosis"}
          </h2>
          <p className="text-sm opacity-90">
            {translations.scanPrompt || "Scan your crop for pests & diseases"}
          </p>
        </div>

        <button
          onClick={() => setScreen("camera")}
          className="w-14 h-14 bg-green-400 rounded-full flex items-center justify-center"
        >
          <img src="/Background.svg" alt="" className="w-8 h-8" />
        </button>
      </div>

      {/* Alerts */}
      <div className="px-4 mt-6">
        <div className="flex justify-between mb-2">
          <h3 className="font-bold text-lg">
            {translations.localCropAlerts || "Local Crop Alerts"}
          </h3>
          <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
            2 New
          </span>
        </div>
        {/* Horizontal Slider */}
        <div className="min-w-[260px] bg-white p-4 rounded-xl shadow border-l-4 border-red-500">
          <h4 className="font-semibold">
            {translations.wheatRustOutbreak || "Wheat Rust Outbreak"}
          </h4>
          <p className="text-sm text-gray-600">
            {translations.reportedInRadius || "Reported in 2km radius."}
          </p>
          <button
            onClick={() => setScreen("wheat-rust")}
            className="text-green-600 font-semibold mt-2"
          >
            {translations.viewPrecautions || "View Precautions →"}
          </button>
        </div>
      </div>

      {/* Manage Farm Grid */}
      <div className="px-4 mt-6">
        <h3 className="font-bold text-lg mb-3">
          {translations.manageYourFarm || "Manage Your Farm"}
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {data.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                if (item.name === "Treatment History")
                  setScreen("diagnosis-history");
                if (item.name === "Market Prices") setScreen("market-prices");
              }}
              className="bg-white p-4 rounded-xl shadow flex flex-col items-center gap-2 cursor-pointer"
            >
              <img src={item.icon} alt="" className="w-10 h-10" />
              <p className="font-medium text-sm">
                {item.name === "Treatment History"
                  ? translations.treatmentHistory || item.name
                  : item.name === "Market Prices"
                    ? translations.marketPrices || item.name
                    : item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tip Card */}
      <div className="mx-4 mt-6 bg-green-900 text-white p-5 rounded-2xl shadow">
        <p className="text-green-300 text-xs mb-1">PRO TIP OF THE DAY</p>
        <p className="font-semibold">
          Morning watering reduces evaporation and helps prevent leaf burn.
        </p>
        <button className="mt-3 bg-green-700 px-4 py-2 rounded-lg text-sm">
          Learn More
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3">
        {" "}
        <button className="text-green-600">
          <img src="Link.svg" alt="" />
        </button>
        <button
          onClick={() => setScreen("camera")}
          className="cursor-pointer active:scale-90 transition duration-150"
        >
          <img src="Scan.svg" alt="" />
        </button>
        {/* <div onClick={()=> handlePlusClick} className="w-16 h-16 bg-green-600 rounded-full border-4 border-white shadow-lg grid place-items-center -translate-y-8">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div> */}
        <button
          onClick={handlePlusClick}
          className="w-16 h-16 bg-green-600 rounded-full border-4 border-white shadow-lg grid place-items-center -translate-y-8 text-white font-bold text-2xl hover:bg-green-700"
        >
          +
        </button>
        <button onClick={()=> setScreen("farmer-community")}>
          <img src="Community.svg" alt="" />
        </button>
        <button onClick={()=>setScreen("profile")}>
          <img src="Profile.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
