import { useState } from "react";

export default function TreatmentDetails({ setScreen }) {
  const [fieldSize, setFieldSize] = useState(1.5);
  const [concentration, setConcentration] = useState("Standard");

  const totalWater = fieldSize * 300; // example calc
  const fungicideAmount = fieldSize * 1.5;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button className="text-green-600 font-medium">← Back</button>
          <h1 className="font-semibold text-sm">
            Late Blight Treatment
          </h1>
          <button className="text-green-600">⤴</button>
        </div>

        <div className="px-4 space-y-4 flex-1 overflow-y-auto pb-20">

          {/* Product Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative">
              <img
                src="/leaf.jpg"
                alt="Treatment"
                className="w-full h-40 object-cover"
              />
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                RECOMMENDED
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h2 className="font-semibold text-lg">
                Copper Fungicide Spray
              </h2>

              <p className="text-sm text-gray-600">
                Highly effective organic treatment for fungal pathogens.
              </p>

              <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500">
                    In stock nearby
                  </p>
                  <p className="text-xs text-gray-400">
                    Green Earth Supplies (2.4 km)
                  </p>
                </div>

                <button className="bg-green-500 text-white text-xs px-3 py-1 rounded-full active:scale-95 transition">
                  Locate
                </button>
              </div>
            </div>
          </div>

          {/* Dosage Calculator */}
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <h3 className="text-green-700 font-semibold text-sm">
              DOSAGE CALCULATOR
            </h3>

            <div className="flex space-x-2">
              <input
                type="number"
                value={fieldSize}
                onChange={(e) => setFieldSize(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm"
              />
              <select
                value={concentration}
                onChange={(e) => setConcentration(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm"
              >
                <option>Standard</option>
                <option>High</option>
              </select>
            </div>

            <div className="bg-green-100 rounded-lg p-3 flex justify-between text-sm font-semibold">
              <div>
                <p className="text-gray-500 text-xs">TOTAL WATER REQUIRED</p>
                <p>{totalWater} Liters</p>
              </div>

              <div>
                <p className="text-gray-500 text-xs">FUNGICIDE AMOUNT</p>
                <p>{fungicideAmount} kg</p>
              </div>
            </div>
          </div>

          {/* Application Steps */}
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <h3 className="text-green-700 font-semibold text-sm">
              APPLICATION STEPS
            </h3>

            {[
              {
                title: "Mix Concentrate",
                text: "Add 5g Copper Fungicide per 1 liter of clean water. Agitate well until fully dissolved."
              },
              {
                title: "Foliar Spray",
                text: "Spray early morning or late evening. Ensure both top and bottom of leaves are thoroughly coated."
              },
              {
                title: "Repeat Cycle",
                text: "Repeat every 7–10 days until symptoms clear or as a preventive measure during humid weather."
              }
            ].map((step, i) => (
              <div key={i} className="flex space-x-3">
                <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-sm">{step.title}</p>
                  <p className="text-xs text-gray-600">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Safety */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-2">
            <h3 className="text-orange-600 font-semibold text-sm">
              ⚠ SAFETY PRECAUTIONS
            </h3>

            <ul className="text-xs text-gray-700 space-y-1">
              <li>• Wear protective gloves and long sleeves during application.</li>
              <li>• Keep livestock away from treated areas for 48 hours.</li>
              <li>• Avoid application if rain is expected within 6 hours.</li>
            </ul>
          </div>

        </div>

        {/* Bottom Nav */}
        <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-2 text-xs">
          <button className="text-gray-500 flex flex-col items-center">
            🏠
            <span>Dashboard</span>
          </button>
          <button className="text-green-600 flex flex-col items-center">
            💊
            <span>Treatments</span>
          </button>
          <button className="text-gray-500 flex flex-col items-center">
            🧴
            <span>Supplies</span>
          </button>
          <button className="text-gray-500 flex flex-col items-center">
            👤
            <span>Profile</span>
          </button>
        </div>

      </div>
    </div>
  );
}
