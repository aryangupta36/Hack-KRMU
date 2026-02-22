export default function TomatoBlightInfo({ setScreen }) {
  return (
    <div className="h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setScreen?.("dashboard")} className="text-green-600 font-medium">← Back</button>
          <h1 className="font-semibold">Precautions</h1>
          <div />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-serif font-bold text-green-900">
          Tomato Blight
        </h1>

        <p className="text-xs tracking-widest text-gray-500 mt-1 uppercase">
          Agricultural Reference: Wiki-042
        </p>

        <hr className="my-4 border-gray-300" />

        {/* Description */}
        <h2 className="text-green-800 font-bold text-sm uppercase mb-2">
          Description
        </h2>

        <p className="text-sm text-gray-700 leading-relaxed">
          Tomato blight is a common and destructive fungal disease that affects
          both leaves and fruit. It is primarily caused by the pathogens
          Alternaria solani or Phytophthora infestans. The disease is
          characterized by the rapid onset of dark brown or black lesions on
          foliage, which may exhibit concentric rings. If left untreated, the
          infection causes yellowing, defoliation, and significant yield loss.
          It thrives in warm, humid conditions and can spread quickly across
          entire fields via wind and water splashes.
        </p>

        {/* Prevention Steps */}
        <h2 className="text-green-800 font-bold text-sm uppercase mt-6 mb-3">
          Prevention Steps
        </h2>

        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            <span className="font-bold text-green-800">
              1. Crop Rotation:
            </span>{" "}
            Practice a three-year rotation cycle for all Solanaceous crops
            (tomatoes, peppers, potatoes) to prevent the build-up of spores in
            the soil.
          </p>

          <p>
            <span className="font-bold text-green-800">
              2. Air Circulation:
            </span>{" "}
            Space plants adequately and prune lower branches to ensure proper
            airflow and sunlight penetration, which helps foliage dry faster.
          </p>

          <p>
            <span className="font-bold text-green-800">
              3. Soil Management:
            </span>{" "}
            Apply a layer of mulch around the base of the plant to create a
            barrier between the soil-borne spores and the leaves.
          </p>

          <p>
            <span className="font-bold text-green-800">
              4. Targeted Irrigation:
            </span>{" "}
            Water plants at the base early in the morning. Avoid overhead
            irrigation to keep leaves dry, as moisture promotes fungal growth.
          </p>

          <p>
            <span className="font-bold text-green-800">
              5. Sanitation:
            </span>{" "}
            Immediately remove and destroy any infected plant debris. Do not
            compost diseased materials, as spores can survive the composting
            process.
          </p>
        </div>

        {/* Footer */}
        <hr className="my-6 border-gray-300" />

        <p className="text-[10px] text-gray-400 italic">
          End of entry. This document is optimized for low-data environments
          and text-only readability in field conditions.
        </p>

      </div>
    </div>
  );
}
