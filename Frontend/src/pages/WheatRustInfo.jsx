export default function WheatRustInfo({ setScreen }) {
  return (
    <div className="h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setScreen?.("dashboard")} className="text-green-600 font-medium">← Back</button>
          <h1 className="font-semibold">Wheat Leaf Rust</h1>
          <div />
        </div>

        <h1 className="text-xl font-bold text-green-900">Wheat Leaf Rust</h1>
        <p className="text-xs tracking-widest text-gray-500 mt-1 uppercase">AGRICULTURAL REFERENCE: WIKI-087</p>

        <hr className="my-4 border-gray-300" />

        <h2 className="text-green-800 font-bold text-sm uppercase mb-2">Description</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Wheat Leaf Rust, caused by the fungus Puccinia triticina, is one of
          the most widespread and destructive diseases of wheat globally. It is
          primarily identified by the appearance of small, circular to oval,
          orange-brown pustules (uredinia) that erupt through the leaf
          epidermis. These pustules contain thousands of spores that can be
          carried long distances by wind. The infection disrupts
          photosynthesis and increases transpiration, leading to shriveled
          kernels and significant reductions in grain yield and quality if the
          upper leaves are heavily infected during the grain-filling stage.
        </p>

        <h2 className="text-green-800 font-bold text-sm uppercase mt-6 mb-3">Prevention Steps</h2>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            <span className="font-bold text-green-800">1. Use resistant varieties:</span> Planting
            wheat cultivars with genetic resistance is the most effective and
            environmentally friendly method of control.
          </p>

          <p>
            <span className="font-bold text-green-800">2. Eradicate alternate hosts:</span> Removing alternate hosts like
            barberry (Berberis vulgaris) near wheat fields can break the life
            cycle of certain rust species and reduce local inoculum.
          </p>

          <p>
            <span className="font-bold text-green-800">3. Apply recommended fungicides:</span> Use foliar fungicides proactively
            when monitoring suggests high disease pressure, especially
            between the flag leaf emergence and flowering stages.
          </p>

          <p>
            <span className="font-bold text-green-800">4. Optimal sowing time:</span> Adjust planting dates to avoid the peak
            periods of spore dispersal and environmental conditions that favor
            rapid fungal development.
          </p>
        </div>

        <hr className="my-6 border-gray-300" />

        <p className="text-[10px] text-gray-400 italic">End of entry. This document is optimized for low-data environments and text-only readability in field conditions.</p>

      </div>
    </div>
  );
}
