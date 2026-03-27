import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSpinner, FaCheck } from "react-icons/fa";

const Generating = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    const generateCV = async () => {
      try {
        const formData = JSON.parse(localStorage.getItem("cvFormData"));
        const mode = localStorage.getItem("mode");
        const selectedTemplate = localStorage.getItem("selectedTemplate");

        setStatus("Analyzing your information...");
        setProgress(20);

        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 80) return prev;
            return prev + 10;
          });
        }, 500);

        setStatus("Crafting your CV with AI...");
        setProgress(40);

        const payload = { ...formData, user_id: 1 };
        const formDataObj = new FormData();
        formDataObj.append("cvData", JSON.stringify(payload));
        formDataObj.append("mode", mode);
        formDataObj.append("showProfileImage", formData.showProfileImage);

        if (formData.profileImage instanceof File) {
          formDataObj.append("profileImage", formData.profileImage);
        }

        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/cv/generate`, formDataObj, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        clearInterval(progressInterval);
        setProgress(100);
        setStatus("CV generated successfully!");

        // Store the result
        localStorage.setItem("generatedCV", JSON.stringify(data));

        setTimeout(() => {
          navigate("/result");
        }, 1500);
      } catch (error) {
        console.error(error);
        setStatus("Error generating CV. Please try again.");
        setProgress(0);
      }
    };

    generateCV();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              {progress === 100 ? (
                <FaCheck className="text-purple-500 text-5xl" />
              ) : (
                <FaSpinner className="text-purple-500 text-5xl animate-spin" />
              )}
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {progress === 100 ? "Ready!" : "Generating Your CV"}
            </h1>

            <p className="text-gray-600 mb-6">{status}</p>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-500">{progress}% Complete</p>
          </div>

          {progress === 100 && (
            <div className="animate-fade-in">
              <p className="text-indigo-600 font-semibold">
                Redirecting to your CV...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generating;
