import { useNavigate } from "react-router-dom";
import { FaRobot, FaPen, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            AI CV Builder 2026
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Create professional CVs effortlessly with AI assistance or manual
            control. Choose your path to success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-indigo-500  rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaRobot className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Mode</h3>
            <p className="text-gray-600 mb-6">
              Let AI craft your perfect CV. Just provide basic info and let our
              advanced AI do the rest.
            </p>
            <button
              onClick={() => navigate("/ai")}
              className="w-full bg-indigo-600 text-white py-3 px-6 font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Start AI Builder
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaPen className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Manual Mode
            </h3>
            <p className="text-gray-600 mb-6">
              Take full control. Build your CV step by step with detailed forms
              and customization options.
            </p>
            <button
              onClick={() => navigate("/manual")}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6  font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Start Manual Builder
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
