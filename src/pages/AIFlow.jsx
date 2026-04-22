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
  FaListUl,
} from "react-icons/fa";
import { getTemplateById } from "../data/templates";
import { getCurrentUser } from "../lib/session";

const AIFlow = () => {
  const navigate = useNavigate();
  const selectedTemplate = getTemplateById(
    localStorage.getItem("selectedTemplate"),
  );
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    location: "",
    targetRole: "",
    yearsExperience: "",
    careerLevel: "mid-level",
    industryFocus: "",
    preferredTone: "confident",
    topSkills: "",
    strongestAchievements: "",
    workHistoryHighlights: "",
    projectHighlights: "",
    educationDetails: "",
    certifications: "",
    jobDescription: "",
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
    localStorage.setItem("cvFormData", JSON.stringify(formData));
    localStorage.setItem("mode", "AI");
    navigate("/generating");
  };

  return (
    <div className="page-shell px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--app-muted)]">
              AI Builder
            </p>
            <h1 className="mt-2 text-5xl font-semibold leading-none text-[var(--app-ink)] md:text-6xl">
              Give the basics. Let AI draft the rest.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--app-muted)]">
              Your content will be generated into the {selectedTemplate.name}{" "}
              template you already selected.
            </p>
          </div>
          <div className="rounded-full border border-black/10 bg-white/55 px-4 py-3 text-sm text-[var(--app-muted)]">
            Template:{" "}
            <span className="font-semibold text-[var(--app-ink)]">
              {selectedTemplate.name}
            </span>
          </div>
        </div>

        {user && (
          <div className="mb-6 rounded-[24px] border border-[var(--app-accent)]/10 bg-white/55 px-5 py-4 text-sm text-[var(--app-muted)]">
            Logged in as{" "}
            <span className="font-semibold text-[var(--app-ink)]">
              {user.email}
            </span>
            . This CV will be saved to your account automatically.
          </div>
        )}

        <div className="surface-panel rounded-[32px] p-5 md:p-8">
          <div className="space-y-6">
            <div className="text-center">
              <label className="mb-2 block text-sm font-medium text-[var(--app-muted)]">
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
                  className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-[24px] border border-black/10 bg-white/70 transition-all hover:bg-white"
                >
                  {formData.profileImagePreview ? (
                    <img
                      src={formData.profileImagePreview}
                      alt="Profile"
                      className="h-full w-full rounded-[24px] object-cover"
                    />
                  ) : (
                    <FaCamera className="text-2xl text-[var(--app-muted)]" />
                  )}
                </label>
                <label className="flex items-center gap-2 text-sm text-[var(--app-muted)]">
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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--app-muted)]" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-black/10 bg-white/65 py-3 pl-11 pr-4 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                  required
                />
              </div>

              <div className="relative">
                <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--app-muted)]" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Job Title"
                  className="w-full rounded-2xl border border-black/10 bg-white/65 py-3 pl-11 pr-4 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--app-muted)]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full rounded-2xl border border-black/10 bg-white/65 py-3 pl-11 pr-4 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                  required
                />
              </div>

              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--app-muted)]" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full rounded-2xl border border-black/10 bg-white/65 py-3 pl-11 pr-4 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <FaLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--app-muted)]" />
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn Profile"
                  className="w-full rounded-2xl border border-black/10 bg-white/65 py-3 pl-11 pr-4 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                />
              </div>

              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="Portfolio Website"
                className="w-full rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
              />
              <input
                type="text"
                name="targetRole"
                value={formData.targetRole}
                onChange={handleChange}
                placeholder="Target Role"
                className="w-full rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
              />
              <input
                type="text"
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleChange}
                placeholder="Years of Experience"
                className="w-full rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <select
                name="careerLevel"
                value={formData.careerLevel}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
              >
                <option value="student">Student / Entry level</option>
                <option value="junior">Junior</option>
                <option value="mid-level">Mid-level</option>
                <option value="senior">Senior</option>
                <option value="executive">Executive</option>
              </select>
              <select
                name="preferredTone"
                value={formData.preferredTone}
                onChange={handleChange}
                className="w-full rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
              >
                <option value="confident">Confident</option>
                <option value="formal">Formal</option>
                <option value="results-driven">Results-driven</option>
                <option value="creative">Creative</option>
              </select>
            </div>

            <div className="rounded-[28px] border border-black/10 bg-white/45 p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--app-accent)] text-white">
                  <FaListUl />
                </span>
                <div>
                  <h2 className="text-3xl font-semibold text-[var(--app-ink)]">
                    Give AI richer material
                  </h2>
                  <p className="text-sm text-[var(--app-muted)]">
                    The more detail you provide here, the stronger the generated
                    CV will be.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <textarea
                  name="industryFocus"
                  value={formData.industryFocus}
                  onChange={handleChange}
                  placeholder="Industry focus, domain knowledge, or type of companies you are targeting"
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                />
                <textarea
                  name="topSkills"
                  value={formData.topSkills}
                  onChange={handleChange}
                  placeholder="Top skills, tools, stacks, or keywords separated by commas"
                  rows={4}
                  className="w-full resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                />
                <textarea
                  name="strongestAchievements"
                  value={formData.strongestAchievements}
                  onChange={handleChange}
                  placeholder="Key achievements with numbers, impact, promotions, awards, or major wins"
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                />
                <textarea
                  name="workHistoryHighlights"
                  value={formData.workHistoryHighlights}
                  onChange={handleChange}
                  placeholder="Past roles, responsibilities, leadership, clients, or business outcomes"
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                />
                <textarea
                  name="projectHighlights"
                  value={formData.projectHighlights}
                  onChange={handleChange}
                  placeholder="Important projects, launches, case studies, technical builds, or portfolios"
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                />
                <textarea
                  name="educationDetails"
                  value={formData.educationDetails}
                  onChange={handleChange}
                  placeholder="Degrees, courses, certificates, training, and relevant education details"
                  rows={5}
                  className="w-full resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <textarea
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                placeholder="Certifications, licenses, languages, volunteer work, or extras"
                rows={4}
                className="w-full resize-none rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
              />
              <textarea
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                placeholder="Paste a job description or target keywords so AI can tailor the CV"
                rows={4}
                className="w-full resize-none rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--app-muted)]">
                Additional Information
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Tell us about your experience, skills, education, projects, or anything else you'd like to include in your CV..."
                rows={6}
                className="w-full resize-none rounded-2xl border border-black/10 bg-white/65 px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
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
              className="brand-button flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold transition-all disabled:cursor-not-allowed disabled:bg-[#9f9488]"
            >
              Generate My CV
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFlow;
