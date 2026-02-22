import { useState } from "react";

const discussionsData = [
  {
    id: 1,
    author: "John D.",
    role: "Wheat Farmer",
    time: "2h ago",
    status: "HELP NEEDED",
    title: "Yellow spots appearing on lower wheat leaves?",
    description: "Seeing strange yellow discoloration on my winter wheat. Is anyone else in the county dealing with wheat. Rust this early? Looking for treatment advice ASAP?",
    likes: 24,
    comments: 9,
    avatar: "JD",
    color: "bg-green-400"
  },
  {
    id: 2,
    author: "Sarah M.",
    role: "Wheat Farmer",
    time: "5h ago",
    status: "RESOLVED",
    title: "Tip: Natural copper spray for mildew",
    description: "The organic copper spray worked wonders on my grapes this morning. Thanks to those who recommended the local mixture!",
    likes: 56,
    comments: 12,
    avatar: "SM",
    color: "bg-blue-400"
  },
  {
    id: 3,
    author: "Raj K.",
    role: "Crop Farmer",
    time: "8h ago",
    status: "HELP NEEDED",
    title: "Pest alert: Stem borer spotted?",
    description: "Seeing early signs of stem borer in the eastern plot. Has anyone tried the new pheromone trap available at the co-op?",
    likes: 15,
    comments: 3,
    avatar: "RK",
    color: "bg-orange-400"
  }
];

export default function FarmerCommunity({ setScreen }) {
  const [activeTab, setActiveTab] = useState("discussions");

  const getStatusColor = (status) => {
    if (status === "HELP NEEDED") return "bg-orange-100 text-orange-600";
    if (status === "RESOLVED") return "bg-green-100 text-green-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between border-b">
        <h1 className="font-bold text-lg">Farmer Community Hub</h1>
        <button className="text-gray-600" onClick={()=> setScreen("dashboard")}>
          <img src="/Close.svg" alt="search" className="w-10 h-10" />
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex">
          <button
            onClick={() => setActiveTab("discussions")}
            className={`flex-1 py-3 text-center font-medium text-sm border-b-2 ${
              activeTab === "discussions"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-600"
            }`}
          >
            Local Discussions
          </button>
          <button
            onClick={() => setActiveTab("trending")}
            className={`flex-1 py-3 text-center font-medium text-sm border-b-2 ${
              activeTab === "trending"
                ? "border-green-500 text-green-600"
                : "border-transparent text-gray-600"
            }`}
          >
            Trending
          </button>
        </div>
      </div>

      {/* Discussions List */}
      <div className="divide-y">
        {discussionsData.map((discussion) => (
          <div key={discussion.id} className="bg-white p-4">
            {/* Author Info */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`${discussion.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                  {discussion.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{discussion.author}</p>
                  <p className="text-xs text-gray-500">{discussion.role} • {discussion.time}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(discussion.status)}`}>
                {discussion.status}
              </span>
            </div>

            {/* Post Content */}
            <h3 className="font-semibold text-sm mb-2">{discussion.title}</h3>
            <p className="text-xs text-gray-600 mb-4">{discussion.description}</p>

            {/* Engagement */}
            <div className="flex justify-between items-center">
              <div className="flex gap-4 text-xs text-gray-500">
                <span>👍 {discussion.likes}</span>
                <span>💬 {discussion.comments}</span>
              </div>

              {discussion.status === "HELP NEEDED" ? (
                <button className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-green-600">
                  Reply
                </button>
              ) : (
                <button className="text-green-600 font-semibold text-xs hover:text-green-700">
                  View Thread
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-28 right-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 font-bold text-xl">
        +
      </button>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3">
        <button onClick={() => setScreen("dashboard")}>
          <img src="/Link.svg" alt="" />
        </button>

        <button onClick={() => setScreen("camera")}>
          <img src="/Scan.svg" alt="" />
        </button>

        <button className="text-green-600">
          <img src="/Community.svg" alt="" />
        </button>

        <button onClick={() => setScreen("profile")}>
          <img src="/Profile.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
