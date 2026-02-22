import { useState, useEffect } from "react";
import OnBoardingSystem from "./pages/onBoarding.jsx";
import Dashboard from "./pages/Dashboard";
import Diagnosis from "./pages/Diagnosis.jsx";
import CameraScanner from "./pages/CameraScanner.jsx";
import DiagnosisResults from "./pages/DiagnosisResults.jsx";
import DiagnosisHistory from "./pages/DiagnosisHistory.jsx";
import TomatoBlightInfo from "./pages/TomatoBlightInfo.jsx";
import WheatRustInfo from "./pages/WheatRustInfo.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";
import MarketPrices from "./pages/MarketPrices.jsx";
import ActionPlan from "./pages/ActionPlan.jsx";
import FarmerCommunity from "./pages/FarmerCommunity.jsx";
import { diagnose } from "./api/api.js";

export default function App() {

  const [onBoarded, setOnBoarded] = useState(
    localStorage.getItem("onboarded") === "true"
  );

  // Screen is ALWAYS an object
  const [screen, setScreen] = useState({
    name: onBoarded ? "dashboard" : "onboarding",
    data: null
  });

  const changeScreen = (name, data = null) => {
    setScreen({ name, data });
  };

  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const finishOnboarding = () => {
    localStorage.setItem("onboarded", "true");
    setOnBoarded(true);
    changeScreen("dashboard");
  };

  // 🔥 Centralized Diagnosis Logic
  useEffect(() => {
    if (!capturedImage) return;

    const runDiagnosis = async () => {
      try {
        setLoading(true);

        const blob = await (await fetch(capturedImage)).blob();
        const file = new File(
          [blob],
          `diagnosis_${Date.now()}.jpg`,
          { type: "image/jpeg" }
        );

        const result = await diagnose(file);

        changeScreen("diagnosis-results", result);

      } catch (err) {
        console.error("Diagnosis failed:", err);
        changeScreen("dashboard");
      } finally {
        setLoading(false);
      }
    };

    runDiagnosis();
  }, [capturedImage]);

  switch (screen.name) {

    case "onboarding":
      return <OnBoardingSystem onFinish={finishOnboarding} />;

    case "dashboard":
      return (
        <Dashboard
          setScreen={changeScreen}
          setCapturedImage={setCapturedImage}
        />
      );

    case "camera":
      return (
        <CameraScanner
          setScreen={changeScreen}
          setCapturedImage={setCapturedImage}
        />
      );

    case "diagnosis":
      return (
        <Diagnosis
          setScreen={changeScreen}
          image={capturedImage}
        />
      );

    case "diagnosis-results":
      return (
        <DiagnosisResults
          setScreen={changeScreen}
          image={capturedImage}
          appData={screen.data}   // ✅ FIXED
          loading={loading}
        />
      );

    case "action-plan":
      return (
        <ActionPlan
          setScreen={changeScreen}
          actionPlanData={screen.data}  // ✅ FIXED
        />
      );

    case "diagnosis-history":
      return <DiagnosisHistory setScreen={changeScreen} />;

    case "tomato-blight":
      return <TomatoBlightInfo setScreen={changeScreen} />;

    case "wheat-rust":
      return <WheatRustInfo setScreen={changeScreen} />;

    case "profile":
      return <ProfileSettings setScreen={changeScreen} />;

    case "market-prices":
      return <MarketPrices setScreen={changeScreen} />;

    case "farmer-community":
      return <FarmerCommunity setScreen={changeScreen} />;

    default:
      return (
        <Dashboard
          setScreen={changeScreen}
          setCapturedImage={setCapturedImage}
        />
      );
  }
}
