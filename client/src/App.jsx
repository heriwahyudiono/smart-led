import React, { useState, useEffect } from "react";
import { setLedStatus, listenLedStatus } from "./firebaseConfig";
import { Lightbulb, LightbulbOff } from "lucide-react"; 

const LedControl = () => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    listenLedStatus((status) => {
      setIsOn(status);
    });
  }, []);

  const handleToggle = () => {
    setLedStatus(!isOn);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-all duration-500 ${
        !isOn ? "bg-gray-100" : "bg-gray-900"
      }`}
    >
      <div
        className={`relative mb-6 transition-all duration-500 ${
          !isOn ? "shadow-[0_0_80px_30px_rgba(255,200,100,0.5)]" : ""
        }`}
      >
        {!isOn ? (
          <Lightbulb size={120} className="text-yellow-400" />
        ) : (
          <LightbulbOff size={120} className="text-gray-500" />
        )}
      </div>

      <h1
        className={`text-3xl font-bold mb-6 transition-all duration-500 ${
          !isOn ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        {!isOn ? "LED Nyala" : "LED Mati"}
      </h1>

      <button
        onClick={handleToggle}
        className={`px-6 py-3 text-white text-lg font-semibold rounded-lg transition duration-300 ${
          !isOn ? "bg-yellow-500 hover:bg-yellow-600" : "bg-gray-600 hover:bg-gray-700"
        }`}
      >
        {!isOn ? "Matikan LED" : "Nyalakan LED"}
      </button>
    </div>
  );
};

export default LedControl;
