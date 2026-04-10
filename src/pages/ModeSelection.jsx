import { useNavigate } from "react-router-dom";
import { FaRobot, FaPen, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { LuBrain } from "react-icons/lu";
const ModeSelection = () => {
  const navigate = useNavigate();

  const modes = [
    {
      id: "ai",
      icon: LuBrain,
      title: "AI Mode",
      subtitle: "Guided & Smart",
      description:
        "Let AI generate your CV content. Perfect for busy professionals who want instant results.",
      benefits: [
        "✓ AI-powered content generation",
        "✓ Smart suggestions for improvements",
        "✓ Fast - takes about 5 minutes",
        "✓ Great for career changers",
      ],
      color: "indigo",
      route: "/ai",
    },
    {
      id: "manual",
      icon: FiEdit3,
      title: "Manual Mode",
      subtitle: "Full Control",
      description:
        "Build your CV step by step. Perfect for those who want complete control and customization.",
      benefits: [
        "✓ Complete control over content",
        "✓ Detailed form guidance",
        "✓ Section-by-section editing",
        "✓ Full customization options",
      ],
      color: "emerald",
      route: "/manual",
    },
  ];

  const handleModeSelect = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mt-7 mb-12">
          <div className="">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              How do you want to build?
            </h1>
            <p className="text-gray-600 mt-2">
              Choose your approach based on how much control you want
            </p>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Mode Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const colorClasses = {
              indigo: {
                bg: "bg-indigo-50",
                border: "border-indigo-200",
                button: "bg-indigo-600 hover:bg-indigo-700",
                icon: "text-indigo-600",
              },
              emerald: {
                bg: "bg-emerald-50",
                border: "border-emerald-200",
                button: "bg-emerald-600 hover:bg-emerald-700",
                icon: "text-emerald-600",
              },
            };

            const colors = colorClasses[mode.color];

            return (
              <div
                key={mode.id}
                className={`${colors.bg} border-2 ${colors.border} rounded-3xl p-8 transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center`}
                  >
                    <Icon className={`${colors.icon} text-3xl`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {mode.title}
                    </h3>
                    <p className="text-sm text-gray-600">{mode.subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {mode.description}
                </p>

                <div className="space-y-2 mb-8">
                  {mode.benefits.map((benefit, idx) => (
                    <p key={idx} className="text-sm text-gray-700">
                      {benefit}
                    </p>
                  ))}
                </div>

                <button
                  onClick={() => handleModeSelect(mode.route)}
                  className={`w-full ${colors.button} text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg`}
                >
                  Choose {mode.title}
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;
