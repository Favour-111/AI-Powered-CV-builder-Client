import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaProjectDiagram,
  FaCamera,
} from "react-icons/fa";

const ManualFlow = () => {
  const navigate = useNavigate();
  const [cv, setCv] = useState({
    fullName: "",
    title: "",
    contact: { email: "", phone: "", linkedin: "", portfolio: "" },
    summary: "",
    skills: { technical: [""], tools: [""], soft: [""] },
    experience: [{ company: "", role: "", duration: "", bullets: [""] }],
    projects: [{ name: "", description: "", bullets: [""] }],
    education: [{ school: "", degree: "", year: "" }],
    extras: { certifications: [""], awards: [""], languages: [""] },
    profileImage: null,
    profileImagePreview: null,
    showProfileImage: true,
  });

  const handleField = (path, value) => {
    const keys = path.split(".");
    setCv((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      let obj = copy;
      while (keys.length > 1) obj = obj[keys.shift()];
      obj[keys[0]] = value;
      return copy;
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCv((prev) => ({
      ...prev,
      profileImage: file,
      profileImagePreview: url,
      showProfileImage: true,
    }));
  };

  const addNestedItem = (section, key) => {
    setCv((prev) => {
      const n = { ...prev };
      n[section][key] = [...n[section][key], ""];
      return n;
    });
  };

  const removeNestedItem = (section, key, index) => {
    setCv((prev) => {
      const n = { ...prev };
      n[section][key] = n[section][key].filter((_, i) => i !== index);
      return n;
    });
  };

  const handleSubmit = () => {
    localStorage.setItem("cvFormData", JSON.stringify(cv));
    localStorage.setItem("mode", "Manual");
    navigate("/template-select");
  };

  const sections = [
    { key: "personal", label: "Personal Info", icon: FaUser },
    { key: "experience", label: "Experience", icon: FaBriefcase },
    { key: "education", label: "Education", icon: FaGraduationCap },
    { key: "skills", label: "Skills", icon: FaTools },
    { key: "projects", label: "Projects", icon: FaProjectDiagram },
  ];

  const [activeSection, setActiveSection] = useState("personal");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Manual CV Builder
          </h1>
          <p className="text-gray-600">
            Build your CV step by step with full control
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Sections</h3>
              <ul className="space-y-2">
                {sections.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.key}>
                      <button
                        onClick={() => setActiveSection(item.key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 ${
                          activeSection === item.key
                            ? "bg-emerald-100 text-emerald-700 shadow-md"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="text-lg" />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <button
                onClick={handleSubmit}
                className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-2xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Continue to Templates
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              {activeSection === "personal" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Personal Information
                  </h2>

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
                        {cv.profileImagePreview ? (
                          <img
                            src={cv.profileImagePreview}
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
                          checked={cv.showProfileImage}
                          onChange={(e) =>
                            setCv((p) => ({
                              ...p,
                              showProfileImage: e.target.checked,
                            }))
                          }
                        />
                        Show profile image in CV
                      </label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={cv.fullName}
                      onChange={(e) => handleField("fullName", e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                    <input
                      type="text"
                      value={cv.title}
                      onChange={(e) => handleField("title", e.target.value)}
                      placeholder="Job Title"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      value={cv.contact.email}
                      onChange={(e) =>
                        handleField("contact.email", e.target.value)
                      }
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                    <input
                      type="tel"
                      value={cv.contact.phone}
                      onChange={(e) =>
                        handleField("contact.phone", e.target.value)
                      }
                      placeholder="Phone"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="url"
                      value={cv.contact.linkedin}
                      onChange={(e) =>
                        handleField("contact.linkedin", e.target.value)
                      }
                      placeholder="LinkedIn"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                    <input
                      type="url"
                      value={cv.contact.portfolio}
                      onChange={(e) =>
                        handleField("contact.portfolio", e.target.value)
                      }
                      placeholder="Portfolio"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <textarea
                    value={cv.summary}
                    onChange={(e) => handleField("summary", e.target.value)}
                    placeholder="Professional Summary"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                  />
                </div>
              )}

              {activeSection === "experience" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Experience
                  </h2>
                  {cv.experience.map((item, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-2xl p-6 space-y-4"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          value={item.company}
                          onChange={(e) => {
                            const updated = [...cv.experience];
                            updated[idx] = {
                              ...updated[idx],
                              company: e.target.value,
                            };
                            setCv((prev) => ({ ...prev, experience: updated }));
                          }}
                          placeholder="Company"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                        <input
                          value={item.role}
                          onChange={(e) => {
                            const updated = [...cv.experience];
                            updated[idx] = {
                              ...updated[idx],
                              role: e.target.value,
                            };
                            setCv((prev) => ({ ...prev, experience: updated }));
                          }}
                          placeholder="Role"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <input
                        value={item.duration}
                        onChange={(e) => {
                          const updated = [...cv.experience];
                          updated[idx] = {
                            ...updated[idx],
                            duration: e.target.value,
                          };
                          setCv((prev) => ({ ...prev, experience: updated }));
                        }}
                        placeholder="Duration"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Achievements</p>
                        {item.bullets.map((b, bi) => (
                          <div key={bi} className="flex gap-2">
                            <input
                              value={b}
                              onChange={(e) => {
                                const updated = [...cv.experience];
                                updated[idx].bullets[bi] = e.target.value;
                                setCv((prev) => ({
                                  ...prev,
                                  experience: updated,
                                }));
                              }}
                              placeholder="Achievement"
                              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                            <button
                              onClick={() => {
                                const updated = [...cv.experience];
                                updated[idx].bullets = updated[
                                  idx
                                ].bullets.filter((_, i) => i !== bi);
                                setCv((prev) => ({
                                  ...prev,
                                  experience: updated,
                                }));
                              }}
                              className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const updated = [...cv.experience];
                            updated[idx].bullets.push("");
                            setCv((prev) => ({ ...prev, experience: updated }));
                          }}
                          className="text-emerald-600 hover:text-emerald-700 text-sm"
                        >
                          + Add achievement
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          setCv((prev) => ({
                            ...prev,
                            experience: prev.experience.filter(
                              (_, i) => i !== idx,
                            ),
                          }))
                        }
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove experience
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      setCv((prev) => ({
                        ...prev,
                        experience: [
                          ...prev.experience,
                          {
                            company: "",
                            role: "",
                            duration: "",
                            bullets: [""],
                          },
                        ],
                      }))
                    }
                    className="w-full py-3 border-2 border-dashed border-emerald-300 text-emerald-600 rounded-2xl hover:bg-emerald-50 transition-all duration-300"
                  >
                    + Add Experience
                  </button>
                </div>
              )}

              {activeSection === "education" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Education
                  </h2>
                  {cv.education.map((item, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-2xl p-6 space-y-4"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          value={item.school}
                          onChange={(e) => {
                            const updated = [...cv.education];
                            updated[idx] = {
                              ...updated[idx],
                              school: e.target.value,
                            };
                            setCv((prev) => ({ ...prev, education: updated }));
                          }}
                          placeholder="School"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                        <input
                          value={item.degree}
                          onChange={(e) => {
                            const updated = [...cv.education];
                            updated[idx] = {
                              ...updated[idx],
                              degree: e.target.value,
                            };
                            setCv((prev) => ({ ...prev, education: updated }));
                          }}
                          placeholder="Degree"
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <input
                        value={item.year}
                        onChange={(e) => {
                          const updated = [...cv.education];
                          updated[idx] = {
                            ...updated[idx],
                            year: e.target.value,
                          };
                          setCv((prev) => ({ ...prev, education: updated }));
                        }}
                        placeholder="Year"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button
                        onClick={() =>
                          setCv((prev) => ({
                            ...prev,
                            education: prev.education.filter(
                              (_, i) => i !== idx,
                            ),
                          }))
                        }
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove education
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      setCv((prev) => ({
                        ...prev,
                        education: [
                          ...prev.education,
                          { school: "", degree: "", year: "" },
                        ],
                      }))
                    }
                    className="w-full py-3 border-2 border-dashed border-emerald-300 text-emerald-600 rounded-2xl hover:bg-emerald-50 transition-all duration-300"
                  >
                    + Add Education
                  </button>
                </div>
              )}

              {activeSection === "skills" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
                  {["technical", "tools", "soft"].map((cat) => (
                    <div key={cat} className="space-y-3">
                      <h3 className="text-lg font-semibold capitalize">
                        {cat} Skills
                      </h3>
                      {cv.skills[cat].map((skill, idx) => (
                        <div key={`${cat}-${idx}`} className="flex gap-2">
                          <input
                            value={skill}
                            onChange={(e) => {
                              const updated = {
                                ...cv.skills,
                                [cat]: [...cv.skills[cat]],
                              };
                              updated[cat][idx] = e.target.value;
                              setCv((prev) => ({ ...prev, skills: updated }));
                            }}
                            placeholder={`Add ${cat} skill`}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => {
                              const updated = {
                                ...cv.skills,
                                [cat]: cv.skills[cat].filter(
                                  (_, i) => i !== idx,
                                ),
                              };
                              setCv((prev) => ({ ...prev, skills: updated }));
                            }}
                            className="px-3 py-3 text-red-500 hover:bg-red-50 rounded-xl"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const updated = {
                            ...cv.skills,
                            [cat]: [...cv.skills[cat], ""],
                          };
                          setCv((prev) => ({ ...prev, skills: updated }));
                        }}
                        className="text-emerald-600 hover:text-emerald-700 text-sm"
                      >
                        + Add {cat} skill
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === "projects" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
                  {cv.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-2xl p-6 space-y-4"
                    >
                      <input
                        value={proj.name}
                        onChange={(e) => {
                          const updated = [...cv.projects];
                          updated[idx] = {
                            ...updated[idx],
                            name: e.target.value,
                          };
                          setCv((prev) => ({ ...prev, projects: updated }));
                        }}
                        placeholder="Project Name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <textarea
                        value={proj.description}
                        onChange={(e) => {
                          const updated = [...cv.projects];
                          updated[idx] = {
                            ...updated[idx],
                            description: e.target.value,
                          };
                          setCv((prev) => ({ ...prev, projects: updated }));
                        }}
                        placeholder="Project Description"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                      />
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Key Points</p>
                        {proj.bullets.map((b, bi) => (
                          <div key={bi} className="flex gap-2">
                            <input
                              value={b}
                              onChange={(e) => {
                                const updated = [...cv.projects];
                                updated[idx].bullets[bi] = e.target.value;
                                setCv((prev) => ({
                                  ...prev,
                                  projects: updated,
                                }));
                              }}
                              placeholder="Key point"
                              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                            <button
                              onClick={() => {
                                const updated = [...cv.projects];
                                updated[idx].bullets = updated[
                                  idx
                                ].bullets.filter((_, i) => i !== bi);
                                setCv((prev) => ({
                                  ...prev,
                                  projects: updated,
                                }));
                              }}
                              className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-xl"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const updated = [...cv.projects];
                            updated[idx].bullets.push("");
                            setCv((prev) => ({ ...prev, projects: updated }));
                          }}
                          className="text-emerald-600 hover:text-emerald-700 text-sm"
                        >
                          + Add key point
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          setCv((prev) => ({
                            ...prev,
                            projects: prev.projects.filter((_, i) => i !== idx),
                          }))
                        }
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove project
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      setCv((prev) => ({
                        ...prev,
                        projects: [
                          ...prev.projects,
                          { name: "", description: "", bullets: [""] },
                        ],
                      }))
                    }
                    className="w-full py-3 border-2 border-dashed border-emerald-300 text-emerald-600 rounded-2xl hover:bg-emerald-50 transition-all duration-300"
                  >
                    + Add Project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualFlow;
