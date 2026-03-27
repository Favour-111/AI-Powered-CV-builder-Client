import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaBriefcase,
  FaCamera,
} from "react-icons/fa";

const AIFlow = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    additionalInfo: "",
    profileImage: null,
    profileImagePreview: null,
    showProfileImage: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      profileImage: file,
      profileImagePreview: url,
      showProfileImage: true,
    }));
  };

  const handleSubmit = () => {
    // Store in localStorage or context for next steps
    localStorage.setItem("cvFormData", JSON.stringify(formData));
    localStorage.setItem("mode", "AI");
    navigate("/template-select");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI CV Builder
          </h1>
          <p className="text-sm text-gray-600">
            Fill in your basic information and let AI create your perfect CV
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <div className="space-y-6">
            {/* Profile Image */}
            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo (Optional)
              </label>
              <div className="flex flex-col items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                  id="profileImage"
                />
                <label
                  htmlFor="profileImage"
                  className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
                >
                  {formData.profileImagePreview ? (
                    <img
                      src={formData.profileImagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <FaCamera className="text-gray-500 text-2xl" />
                  )}
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={formData.showProfileImage}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        showProfileImage: e.target.checked,
                      }))
                    }
                  />
                  Show profile image in CV
                </label>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Job Title"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn Profile"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="Portfolio Website"
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Information
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Tell us about your experience, skills, education, projects, or anything else you'd like to include in your CV..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={
                !formData.fullName ||
                !formData.title ||
                !formData.email ||
                !formData.phone
              }
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              Generate My CV
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFlow;
