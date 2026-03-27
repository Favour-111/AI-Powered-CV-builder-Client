import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaPalette, FaBuilding } from "react-icons/fa";
import { IoSparklesOutline } from "react-icons/io5";
const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and contemporary design with subtle gradients",
    icon: IoSparklesOutline,
    preview: "bg-gradient-to-r from-indigo-500 to-purple-600",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Professional and formal layout for business environments",
    icon: FaBuilding,
    preview: "bg-gradient-to-r from-gray-600 to-gray-800",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold colors and artistic elements for creative fields",
    icon: FaPalette,
    preview: "bg-gradient-to-r from-pink-500 to-orange-500",
  },
];

const TemplateSelect = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("modern");

  const handleContinue = () => {
    localStorage.setItem("selectedTemplate", selectedTemplate);
    navigate("/generating");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Choose Your CV Template
          </h1>
          <p className="text-gray-600 text-sm">
            Select a design that matches your style and industry
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => {
            const Icon = template.icon;
            return (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`relative cursor-pointer rounded-3xl p-8 transition-all duration-300 transform hover:scale-105 ${
                  selectedTemplate === template.id
                    ? "bg-white shadow-2xl border-2 border-blue-500"
                    : "bg-white/70 backdrop-blur-sm shadow-xl border border-white/20 hover:shadow-2xl"
                }`}
              >
                {selectedTemplate === template.id && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                )}

                <div
                  className={`w-full h-32 ${template.preview} rounded-2xl mb-6 flex items-center justify-center`}
                >
                  <Icon className="text-white text-3xl" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm">{template.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            className="bg-blue-600 text-white py-3 px-8  font-semibold hover:from-blue-700 hover:to-slate-700 transition-all duration-300 flex items-center justify-center gap-2 group mx-auto"
          >
            Generate My CV
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelect;
