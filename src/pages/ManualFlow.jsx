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
import AppHeader from "../components/AppHeader";
import { getTemplateById } from "../data/templates";

const ManualFlow = () => {
  const navigate = useNavigate();
  const selectedTemplate = getTemplateById(
    localStorage.getItem("selectedTemplate"),
  );
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

  const handleContactChange = (key, value) => {
    setCv((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [key]: value,
      },
    }));
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
    navigate("/generating");
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
    <div className="page-shell px-4 py-6 md:px-6 md:py-10">
      <div className="max-w-6xl mx-auto">
        <AppHeader />
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--app-muted)]">
              Manual Builder
            </p>
            <h1 className="mt-2 text-5xl font-semibold leading-none text-[var(--app-ink)] md:text-6xl">
              Manual CV Builder
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--app-muted)]">
              Build your CV section by section with full control inside the{" "}
              {selectedTemplate.name} layout.
            </p>
          </div>
          <div className="rounded-full border border-black/10 bg-white/55 px-4 py-3 text-sm text-[var(--app-muted)]">
            Template:{" "}
            <span className="font-semibold text-[var(--app-ink)]">
              {selectedTemplate.name}
            </span>
          </div>
        </div>

        <div className="flex flex-col-reverse lg:grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="surface-panel sticky top-4 rounded-[30px] p-6">
              <h3 className="mb-4 text-3xl font-semibold text-[var(--app-ink)]">
                Sections
              </h3>
              <ul className="space-y-2">
                {sections.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.key}>
                      <button
                        onClick={() => setActiveSection(item.key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-300 ${
                          activeSection === item.key
                            ? "bg-[var(--app-accent)] text-white shadow-md"
                            : "text-[var(--app-muted)] hover:bg-white/50"
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
                className="brand-button mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold transition-all"
              >
                Generate My CV
                <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="surface-panel rounded-[30px] p-sm-8 p-5">
              {activeSection === "personal" && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-semibold text-[var(--app-ink)]">
                    Personal Information
                  </h2>

                  <div className="text-center">
                    <label className="block text-sm font-medium text-[var(--app-muted)] mb-2">
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
                        className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-2xl border border-black/10 bg-white/70 transition-all hover:bg-white"
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
                      <label className="flex items-center gap-2 text-sm text-[var(--app-muted)]">
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
                      className="w-full rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                    />
                    <input
                      type="text"
                      value={cv.title}
                      onChange={(e) => handleField("title", e.target.value)}
                      placeholder="Job Title"
                      className="w-full rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      value={cv.contact.email}
                      onChange={(e) =>
                        setCv((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, email: e.target.value },
                        }))
                      }
                      placeholder="Email"
                      className="w-full rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                    />
                    <input
                      type="tel"
                      value={cv.contact.phone}
                      onChange={(e) =>
                        setCv((prev) => ({
                          ...prev,
                          contact: { ...prev.contact, phone: e.target.value },
                        }))
                      }
                      placeholder="Phone"
                      className="w-full rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={cv.contact.linkedin}
                      onChange={(e) =>
                        handleContactChange("linkedin", e.target.value)
                      }
                      placeholder="LinkedIn"
                      className="w-full rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                    />
                    <input
                      type="text"
                      value={cv.contact.portfolio}
                      onChange={(e) =>
                        handleContactChange("portfolio", e.target.value)
                      }
                      placeholder="Portfolio"
                      className="w-full rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                    />
                  </div>

                  <textarea
                    value={cv.summary}
                    onChange={(e) => handleField("summary", e.target.value)}
                    placeholder="Professional Summary"
                    rows={4}
                    className="w-full resize-none rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all duration-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                  />
                </div>
              )}

              {activeSection === "experience" && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-semibold text-[var(--app-ink)]">
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
                          className="w-full rounded-xl border border-black/10 bg-white/65 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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
                          className="w-full rounded-xl border border-black/10 bg-white/65 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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
                        className="w-full rounded-xl border border-black/10 bg-white/65 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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
                              className="w-full rounded-xl border border-black/10 bg-white/65 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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
                          className="text-sm text-[var(--app-accent)] hover:text-[#102636]"
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
                    className="w-full rounded-2xl border-2 border-dashed border-[rgba(24,54,74,0.22)] py-3 text-[var(--app-accent)] transition-all duration-300 hover:bg-white/50"
                  >
                    + Add Experience
                  </button>
                </div>
              )}

              {activeSection === "education" && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-semibold text-[var(--app-ink)]">
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
                          className="w-full rounded-xl border border-black/10 bg-white/65 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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
                          className="w-full rounded-xl border border-black/10 bg-white/65 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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
                        className="w-full rounded-xl border border-black/10 bg-white/65 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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
                    className="w-full rounded-2xl border-2 border-dashed border-[rgba(24,54,74,0.22)] py-3 text-[var(--app-accent)] transition-all duration-300 hover:bg-white/50"
                  >
                    + Add Education
                  </button>
                </div>
              )}

              {activeSection === "skills" && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-semibold text-[var(--app-ink)]">
                    Skills
                  </h2>
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
                            className="w-full rounded-xl border border-black/10 bg-white/65 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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
                        className="text-sm text-[var(--app-accent)] hover:text-[#102636]"
                      >
                        + Add {cat} skill
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === "projects" && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-semibold text-[var(--app-ink)]">
                    Projects
                  </h2>
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
                        className="w-full rounded-xl border border-black/10 bg-white/65 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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
                        className="w-full resize-none rounded-xl border border-black/10 bg-white/65 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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
                              className="w-full rounded-xl border border-black/10 bg-white/65 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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
                          className="text-sm text-[var(--app-accent)] hover:text-[#102636]"
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
                    className="w-full rounded-2xl border-2 border-dashed border-[rgba(24,54,74,0.22)] py-3 text-[var(--app-accent)] transition-all duration-300 hover:bg-white/50"
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
