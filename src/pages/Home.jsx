import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaCheck, FaDownload, FaRegClock } from "react-icons/fa";
import { FiZap } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";
import { CgInfinity } from "react-icons/cg";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiBrainLight } from "react-icons/pi";
const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FiZap,
      title: "Lightning Fast",
      desc: "Create a professional CV in minutes, not hours",
    },
    {
      icon: FaShieldAlt,
      title: "Privacy Protected",
      desc: "Your data is secure and GDPR compliant always",
    },
    {
      icon: FaDownload,
      title: "Download Instantly",
      desc: "Export as PDF or save for later editing",
    },
  ];

  const testimonials = [
    { name: "Sarah Mitchell", role: "Marketing Director" },
    { name: "James Chen", role: "Software Engineer" },
    { name: "Emma Rodriguez", role: "Product Manager" },
    { name: "Alex Thompson", role: "Designer" },
    { name: "Lisa Anderson", role: "HR Manager" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <img
            src="https://i.ibb.co/PszMTvCF/a78792e3-1160-48a0-821f-7a1b9e928ed4.png"
            alt="a78792e3 1160 48a0 821f 7a1b9e928ed4"
            className="w-[200px]"
            border="0"
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-2 py-[23px] md:py-20">
        <div className="grid md:grid-cols-2 gap-12 ">
          {/* Left: Content */}
          <div>
            <div className="bg-indigo-500 mb-5 rounded-2xl p-3 w-fit">
              <PiBrainLight className="text-white text-sm-[40px] text-[30px]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Build a job winning resume for free
            </h2>
            <p className="text-md-xl text-sm flex items-center text-gray-600 mb-4">
              <IoMdCheckmarkCircleOutline className="mx-1  text-green-600" />
              Your first resume is 100% free forever
            </p>
            <p className="text-md-xl text-sm flex items-center text-gray-500 mb-4">
              <IoMdCheckmarkCircleOutline className=" mx-1  text-green-600" />
              Unlimited downloads. No hidden fees. Yes, really{" "}
            </p>
            <p className="text-md-xl text-sm flex items-center text-gray-500 mb-8">
              <IoMdCheckmarkCircleOutline className="mx-1 text-green-600" />
              Takes about 5 minutes. No registration needed.
            </p>

            <button
              onClick={() => navigate("/template-select")}
              className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2 group text-lg shadow-lg hover:shadow-xl"
            >
              Get started for free
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Preview */}
          <div className="relative">
            <img
              src="https://marketplace.canva.com/EAFRuCp3DcY/3/0/1131w/canva-black-white-minimalist-cv-resume-fbJ3nW9XufE.jpg"
              alt=""
              className="rounded-3xl w-90 shadow-2xl border border-gray-200"
            />
            {/* <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="text-xs font-semibold text-indigo-600 mb-2">
                  RESUME PREVIEW
                </div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-800 w-40 rounded"></div>
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-400 w-32 rounded"></div>
                    <div className="h-3 bg-gray-300 w-24 rounded"></div>
                  </div>
                  <div className="pt-4 space-y-2">
                    <div className="h-3 bg-gray-300 w-full rounded"></div>
                    <div className="h-3 bg-gray-300 w-5/6 rounded"></div>
                  </div>
                  <div className="pt-4 space-y-2">
                    <div className="h-3 bg-gray-300 w-full rounded"></div>
                    <div className="h-3 bg-gray-300 w-4/5 rounded"></div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Why choose AI CV Builder?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Icon className="text-indigo-600 text-3xl mb-4" />
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Social Proof */}
      {/* <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-8">
            Trusted by millions of job seekers
          </h3>
          <div className="flex justify-center items-center flex-wrap gap-8">
            {testimonials.map((person, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold">
                  {person.name.charAt(0)}
                </div>
                <p className="font-semibold text-gray-900 text-sm">
                  {person.name}
                </p>
                <p className="text-gray-600 text-xs">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to create your perfect CV?
          </h3>
          <p className="text-xl text-indigo-100 mb-8">
            Choose from professional templates and let AI do the heavy lifting.
          </p>
          <button
            onClick={() => navigate("/template-select")}
            className="bg-white text-indigo-600 py-4 px-8 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 group text-lg inline-flex shadow-lg"
          >
            Get started now
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
