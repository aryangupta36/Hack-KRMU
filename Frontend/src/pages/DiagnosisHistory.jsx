import { useState } from "react";

export default function DiagnosisHistory({ setScreen }) {
  const [searchQuery, setSearchQuery] = useState("");

  const recentDiagnoses = [
    {
      crop: "Tomato",
      disease: "Late Blight Detected",
      status: "ONGOING",
      date: "TODAY, 10:24 AM",
      img: "/tomatoo.webp",
    },
    {
      crop: "Cabbage",
      disease: "Clubroot Fungus",
      status: "RESOLVED",
      date: "AUG 24, 2025",
      img: "/cabbage.webp",
    },
    {
      crop: "Maize (Corn)",
      disease: "Common Rust",
      status: "ONGOING",
      date: "AUG 22, 2025",
      img: "/corn.webp",
    },
  ];

  const lastMonthDiagnoses = [
    {
      crop: "Bell Pepper",
      disease: "Bacterial Leaf Spot",
      status: "RESOLVED",
      date: "JULY 21, 2025",
      img: "/pepper.webp",
    },
  ];

  const ongoingCount = 3;
  const resolvedCount = 12;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
          <button onClick={() => setScreen("dashboard")} className="text-xl">‹</button>
          <h1 className="font-semibold text-lg">Diagnosis History</h1>
          <button className="text-xl">☰</button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-28 space-y-4 pt-4">

          {/* Search */}
          <div className="bg-white rounded-xl p-3 flex items-center gap-2">
            <img src="glass.svg" alt="" />
            <input
              type="text"
              placeholder="Search crops or diseases..."
              className="w-full outline-none text-sm bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-100 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-green-600 font-semibold">
                  ONGOING
                </p>
                <h2 className="text-3xl font-bold text-green-600">{ongoingCount}</h2>
              </div>
              <span className="text-3xl">🌿</span>
            </div>

            <div className="bg-gray-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-semibold">
                  RESOLVED
                </p>
                <h2 className="text-3xl font-bold text-gray-700">{resolvedCount}</h2>
              </div>
              <span className="text-3xl">✔</span>
            </div>
          </div>

          {/* Recent Diagnoses Section */}
          <p className="text-xs font-semibold text-gray-500 tracking-wider mt-6">
            RECENT DIAGNOSES
          </p>

          {/* Recent History Cards */}
          {recentDiagnoses.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                if (item.status === "ONGOING") {
                  setScreen("treatment-details");
                } else {
                  setScreen("dashboard");
                }
              }}
              className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm cursor-pointer hover:shadow-md transition"
            >
              <img
                src={item.img}
                alt={item.crop}
                className="w-14 h-14 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.crop}</h3>
                <p className="text-xs text-gray-500">{item.disease}</p>

                <span
                  className={`text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded-full
                  ${
                    item.status === "ONGOING"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">{item.date}</p>
                <span className="text-lg text-gray-400">›</span>
              </div>
            </div>
          ))}

          {/* Last Month Section */}
          <p className="text-xs font-semibold text-gray-500 tracking-wider mt-6">
            LAST MONTH
          </p>

          {/* Last Month Cards */}
          {lastMonthDiagnoses.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                if (item.status === "ONGOING") {
                  setScreen("treatment-details");
                } else {
                  setScreen("dashboard");
                }
              }}
              className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm cursor-pointer hover:shadow-md transition"
            >
              <img
                src={item.img}
                alt={item.crop}
                className="w-14 h-14 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.crop}</h3>
                <p className="text-xs text-gray-500">{item.disease}</p>

                <span
                  className={`text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded-full
                  ${
                    item.status === "ONGOING"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">{item.date}</p>
                <span className="text-lg text-gray-400">›</span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Camera Button */}
        <button onClick={() => setScreen("camera")} className="fixed bottom-30 right-6 bg-green-400 w-16 h-16 rounded-full shadow-lg text-white text-2xl flex items-center justify-center active:scale-95 transition">
          <img src="Camera.svg" alt="" />
        </button>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3 text-xs">
          <button onClick={() => setScreen("dashboard")} className="flex flex-col items-center text-gray-500 gap-1">
            <img src="Link.svg" alt="" />
          </button>

          <button className="flex flex-col items-center text-green-600 gap-1">
            <img src="historyreal.svg" alt="" />
          </button>

          <button onClick={() => setScreen("dashboard")} className="flex flex-col items-center text-gray-500 gap-1">
           <img src="Advice.svg" alt="" />
          </button>

          <button onClick={() => setScreen("dashboard")} className="flex flex-col items-center text-gray-500 gap-1">
            <img src="Profile.svg" alt="" />
          </button>
        </div>

      </div>
    </div>
  );
}
