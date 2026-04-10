import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaCheck, FaArrowLeft } from "react-icons/fa";
import {
  FiLayout,
  FiColumns,
  FiGrid,
  FiZap,
  FiAward,
  FiTrendingUp,
  FiTarget,
  FiCode,
  FiFeather,
  FiBold,
  FiGlobe,
  FiBook,
  FiFileText,
  FiClock,
  FiBarChart2,
} from "react-icons/fi";

const templates = [
  {
    id: "classic-professional",
    name: "Classic Professional",
    category: "Professional",
    layout: "Traditional Block",
    description: "Timeless design with clear sections and formal typography",
    icon: FiFileText,
    color: "from-slate-600 to-gray-700",
    features: ["Formal headers", "Block sections", "Conservative spacing"],
  },
  {
    id: "modern-asymmetric",
    name: "Modern Asymmetric",
    category: "Modern",
    layout: "Asymmetric Layout",
    description:
      "Bold header with asymmetric content blocks and modern spacing",
    icon: FiLayout,
    color: "from-blue-500 to-indigo-600",
    features: ["Large header photo", "Asymmetric columns", "Modern typography"],
  },
  {
    id: "minimalist-lines",
    name: "Minimalist Lines",
    category: "Modern",
    layout: "Line Separators",
    description: "Clean design using subtle lines and ample white space",
    icon: FiFeather,
    color: "from-gray-400 to-slate-500",
    features: ["Thin line separators", "Generous margins", "Minimal icons"],
  },
  {
    id: "creative-mosaic",
    name: "Creative Mosaic",
    category: "Creative",
    layout: "Mosaic Grid",
    description: "Artistic layout with mosaic-style information blocks",
    icon: FiGrid,
    color: "from-purple-500 to-pink-500",
    features: ["Colorful blocks", "Geometric shapes", "Creative typography"],
  },
  {
    id: "executive-sidebar",
    name: "Executive Sidebar",
    category: "Professional",
    layout: "Executive Sidebar",
    description: "Wide sidebar for contact info with elegant main content area",
    icon: FiColumns,
    color: "from-amber-600 to-orange-600",
    features: [
      "Wide contact sidebar",
      "Elegant fonts",
      "Achievement highlights",
    ],
  },
  {
    id: "tech-terminal",
    name: "Tech Terminal",
    category: "Technical",
    layout: "Terminal Style",
    description:
      "Code-inspired design mimicking terminal/command line interface",
    icon: FiCode,
    color: "from-green-500 to-emerald-600",
    features: ["Monospace fonts", "Terminal colors", "Code-like formatting"],
  },
];

const TemplateSelect = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState("modern-clean");
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = ["All", "Modern", "Professional", "Creative", "Technical"];
  const filteredTemplates =
    filterCategory === "All"
      ? templates
      : templates.filter((t) => t.category === filterCategory);

  const handleContinue = () => {
    localStorage.setItem("selectedTemplate", selectedTemplate);
    navigate("/mode-select");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 mt-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your CV Design
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select from 15+ professional templates with different layouts.
              Pick the design that matches your style and industry.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-12 flex justify-center flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filterCategory === cat
                  ? "bg-slate-800 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-300 hover:border-slate-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTemplates.map((template) => {
            const Icon = template.icon;
            const isSelected = selectedTemplate === template.id;
            return (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer group ${
                  isSelected
                    ? "bg-white shadow-xl border border-indigo-200"
                    : "bg-white shadow-md border border-gray-200 hover:shadow-lg"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-3 -right-3 flex items-center justify-center">
                    <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <FaCheck className="text-white text-sm" />
                    </div>
                  </div>
                )}

                {/* Preview Gradient */}
                <div
                  className={`w-full h-40 bg-gradient-to-br ${template.color} rounded-xl mb-4 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}
                >
                  <Icon className="text-white text-4xl opacity-80" />
                </div>

                {/* Template Info */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {template.name}
                  </h3>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2">
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                        {template.category}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {template.layout}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {template.description}
                  </p>
                  <div className="space-y-1">
                    {template.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-xs text-gray-500"
                      >
                        <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Template Summary */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Selected Template</p>
              <h2 className="text-2xl font-bold text-gray-900">
                {templates.find((t) => t.id === selectedTemplate)?.name}
              </h2>
              <p className="text-gray-600 mt-1">
                {templates.find((t) => t.id === selectedTemplate)?.description}
              </p>
            </div>
            <button
              onClick={handleContinue}
              className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 group shadow-lg whitespace-nowrap"
            >
              Continue
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Features CallOut */}
      </div>
    </div>
  );
};

export default TemplateSelect;
