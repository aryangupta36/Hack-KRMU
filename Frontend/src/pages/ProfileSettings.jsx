export default function ProfileSettings({ setScreen }) {
  return (
    <div className="h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-sm flex flex-col h-full">

        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setScreen("dashboard")} className="text-xl">
            ←
          </button>

          <h1 className="font-semibold">Profile & Settings</h1>

          <button className="text-green-500 text-sm font-semibold">
            Save
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-24">

          {/* Profile */}
          <div className="flex flex-col items-center">
            <img
              src="image.png"
              alt=""
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
            />

            <h2 className="text-xl font-bold mt-2">Arjun</h2>
            <p className="text-sm text-gray-500">
              Punjab Region, North India
            </p>

            <button className="mt-2 bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm">
              Edit Personal Info
            </button>
          </div>

          {/* Language Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-xs text-gray-400 mb-3 uppercase">
              Language & Dialect
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <p>🌐 Primary Language</p>
                <span className="text-gray-400">›</span>
              </div>

              <div className="flex justify-between">
                <p>👤 Local Dialect</p>
                <span className="text-gray-400">›</span>
              </div>
            </div>
          </div>

          {/* Connectivity */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-xs text-gray-400 mb-3 uppercase">
              Connectivity
            </h3>

            <div className="flex justify-between items-center">
              <p>Offline Mode</p>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Local Database Status
            </p>

            <div className="w-full bg-gray-200 h-2 rounded mt-1">
              <div className="bg-green-500 h-2 rounded w-full"></div>
            </div>

            <p className="text-xs text-green-600 mt-1">
              100% Downloaded
            </p>
          </div>

          {/* Accessibility */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-xs text-gray-400 mb-3 uppercase">
              Accessibility
            </h3>

            <div className="flex justify-between items-center">
              <p>Voice Guidance</p>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex justify-between mt-3">
              <p>Display Text Size</p>
              <span className="text-gray-400">›</span>
            </div>
          </div>

          {/* Sign Out */}
          <button className="w-full bg-white p-3 rounded-xl text-red-500 font-semibold shadow-sm">
            ⎋ Sign Out
          </button>

          <p className="text-center text-xs text-gray-400">
            VERSION 2.4.0
          </p>
        </div>

      </div>
    </div>
  );
}
