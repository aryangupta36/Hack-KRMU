import { useEffect, useState } from "react";

export default function ActionPlan({ setScreen }) {
  const [days, setDays] = useState([]);
  const [disease, setDisease] = useState("Unknown Disease");
  const [confidence, setConfidence] = useState(0);

  // Load latest diagnosis from localStorage
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem("latestDiagnosis");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (!data?.action_plan) return;

    setDisease(data.disease);
    setConfidence(data.confidence);

    const planData = data.action_plan;
    const daysArray = [];

    for (let i = 1; i <= 7; i++) {
      const key = `day_${i}`;
      if (planData[key]) {
        daysArray.push({
          day: i,
          title: planData[key].focus,
          tasks: planData[key].tasks || [],
        });
      }
    }

    setDays(daysArray);
  }, [data]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setScreen("diagnosis-results")}>
          ←
        </button>

        <div className="text-center">
          <h1 className="font-semibold">7-Day Action Plan</h1>

          <p className="text-green-600 text-xs">
            {disease?.replace(/_/g, " ")}
          </p>

          <p className="text-gray-500 text-xs">
            Confidence: {(confidence * 100).toFixed(1)}%
          </p>
        </div>

        <div />
      </div>

      {/* If No Data */}
      {!data && (
        <div className="text-center text-gray-500">
          No action plan available.
        </div>
      )}

      {/* Render Days */}
      {days.map((day) => (
        <div key={day.day} className="bg-white p-4 rounded-xl shadow mb-4">
          <h3 className="font-semibold mb-2">
            Day {day.day}: {day.title}
          </h3>

          {day.tasks.map((task, i) => (
            <div key={i} className="flex items-start gap-2 mb-1">
              <input type="checkbox" />
              <p className="text-sm">{task}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
