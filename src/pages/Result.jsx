import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaDownload,
  FaEdit,
  FaFolderOpen,
  FaHome,
  FaPrint,
  FaSave,
} from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AppHeader from "../components/AppHeader";
import CVDocument from "../components/CVDocument";
import { cvTemplates, getTemplateById } from "../data/templates";
import { api, withAuth } from "../lib/api";
import { getCurrentUser } from "../lib/session";

const Result = () => {
  const navigate = useNavigate();
  const [cvData, setCvData] = useState(null);
  const [template, setTemplate] = useState(cvTemplates[0].id);
  const [isEditMode, setIsEditMode] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    experience: true,
    education: true,
    projects: true,
    awards: true,
    languages: true,
  });
  const [saveState, setSaveState] = useState({ loading: false, message: "" });
  const cvRef = useRef();
  const user = getCurrentUser();

  useEffect(() => {
    const data = localStorage.getItem("generatedCV");
    const selectedTemplate = localStorage.getItem("selectedTemplate");
    if (data) {
      const parsedData = JSON.parse(data);
      setCvData(parsedData);
      setTemplate(
        parsedData.selectedTemplate || selectedTemplate || cvTemplates[0].id,
      );
      if (parsedData.savedCv?.id) {
        setSaveState({
          loading: false,
          message: "This version is already linked to your saved CV library.",
        });
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const toggleSection = (section) => {
    setVisibleSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleEditField = (path, value) => {
    setCvData((prev) => {
      const updated = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = updated.cv;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const downloadPDF = async () => {
    if (!cvRef.current) return;

    try {
      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${cvData?.cv?.fullName || "CV"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const printCV = () => {
    window.print();
  };

  const handleTemplateChange = (templateId) => {
    localStorage.setItem("selectedTemplate", templateId);
    setTemplate(templateId);
  };

  const saveCurrentCv = async () => {
    if (!user || !cvData) {
      navigate("/auth");
      return;
    }

    setSaveState({ loading: true, message: "" });
    try {
      const { data } = await api.post(
        "/api/cv/save",
        {
          cv: cvData.cv,
          profileImage,
          showProfileImage,
          selectedTemplate: template,
          label: cvData.cv?.title || `${cvData.cv?.fullName || "Untitled"} CV`,
        },
        withAuth(),
      );

      const updatedPayload = {
        ...cvData,
        selectedTemplate: template,
        savedCv: { id: data.savedCv.id },
      };
      setCvData(updatedPayload);
      localStorage.setItem("generatedCV", JSON.stringify(updatedPayload));
      setSaveState({ loading: false, message: "Saved to your account." });
    } catch (error) {
      setSaveState({
        loading: false,
        message:
          error.response?.data?.error || "Unable to save this CV right now.",
      });
    }
  };

  if (!cvData) {
    return (
      <div className="page-shell flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-[var(--app-accent)]"></div>
      </div>
    );
  }

  const cv = cvData.cv;
  const profileImage = cvData.profileImage;
  const showProfileImage = cvData.showProfileImage;
  const activeTemplate = getTemplateById(template);

  const previewCv = {
    ...cv,
    experience: visibleSections.experience ? cv.experience : [],
    education: visibleSections.education ? cv.education : [],
    projects: visibleSections.projects ? cv.projects : [],
    extras: {
      ...cv.extras,
      awards: visibleSections.awards ? cv.extras?.awards : [],
      languages: visibleSections.languages ? cv.extras?.languages : [],
    },
  };

  return (
    <div className="page-shell px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        <AppHeader />
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--app-muted)]">
              Resume Result
            </p>
            <h1 className="mt-2 text-5xl font-semibold leading-none text-[var(--app-ink)] md:text-6xl">
              Your CV now follows the template you picked.
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--app-muted)]">
              Change content, hide sections, or switch to another template style
              before downloading the PDF.
            </p>
          </div>
          <div className="rounded-full border border-black/10 bg-white/50 px-5 py-3 text-sm text-[var(--app-muted)]">
            Active template:{" "}
            <span className="font-semibold text-[var(--app-ink)]">
              {activeTemplate.name}
            </span>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={downloadPDF}
            className="brand-button flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-all"
          >
            <FaDownload /> Download PDF
          </button>
          <button
            onClick={printCV}
            className="secondary-button flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-all"
          >
            <FaPrint /> Print CV
          </button>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-all ${
              isEditMode
                ? "bg-[var(--app-warm)] text-white"
                : "secondary-button"
            }`}
          >
            <FaEdit /> {isEditMode ? "Done Editing" : "Edit CV"}
          </button>
          <button
            onClick={() => navigate("/")}
            className="secondary-button flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-all"
          >
            <FaHome /> Create New CV
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="secondary-button flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-all"
          >
            <FaFolderOpen /> My Saved CVs
          </button>
          <button
            onClick={saveCurrentCv}
            className="brand-button flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-all"
          >
            <FaSave />{" "}
            {saveState.loading
              ? "Saving..."
              : user
                ? "Save to account"
                : "Login to save"}
          </button>
        </div>

        {saveState.message && (
          <div className="mb-8 rounded-[24px] border border-black/10 bg-white/55 px-5 py-4 text-sm text-[var(--app-muted)]">
            {saveState.message}
          </div>
        )}

        <div className="mb-8 rounded-[30px] border border-black/10 bg-white/45 p-4 md:p-5">
          <div className="flex flex-wrap gap-3">
            {cvTemplates.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTemplateChange(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  template === item.id ? "brand-button" : "secondary-button"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {isEditMode && (
            <div className="lg:col-span-1">
              <div className="surface-panel sticky top-4 rounded-[30px] p-6">
                <h2 className="text-3xl font-semibold text-[var(--app-ink)]">
                  Edit Sections
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--app-muted)]">
                  Hide optional blocks or refine the headline fields before
                  export.
                </p>

                <div className="mt-6 space-y-4">
                  {Object.entries(visibleSections).map(
                    ([section, isVisible]) => (
                      <div
                        key={section}
                        className="flex items-center justify-between rounded-2xl border border-black/8 bg-white/55 p-4 transition-colors"
                      >
                        <label className="flex items-center gap-3 cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={isVisible}
                            onChange={() => toggleSection(section)}
                            className="h-5 w-5 cursor-pointer rounded border-gray-300 text-[var(--app-accent)]"
                          />
                          <span className="font-medium capitalize text-[var(--app-ink)]">
                            {section === "awards"
                              ? "Awards & Achievements"
                              : section.charAt(0).toUpperCase() +
                                section.slice(1)}
                          </span>
                        </label>
                      </div>
                    ),
                  )}
                </div>

                <div className="mt-6 border-t border-black/8 pt-6">
                  <h3 className="text-lg font-semibold text-[var(--app-ink)]">
                    Quick Edit
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[var(--app-muted)]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={cv.fullName || ""}
                        onChange={(e) =>
                          handleEditField("fullName", e.target.value)
                        }
                        className="mt-1 w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[var(--app-muted)]">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={cv.title || ""}
                        onChange={(e) =>
                          handleEditField("title", e.target.value)
                        }
                        className="mt-1 w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[var(--app-muted)]">
                        Email
                      </label>
                      <input
                        type="email"
                        value={cv.contact?.email || ""}
                        onChange={(e) =>
                          handleEditField("contact.email", e.target.value)
                        }
                        className="mt-1 w-full rounded-2xl border border-black/10 bg-white/70 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[var(--app-muted)]">
                        Professional Summary
                      </label>
                      <textarea
                        value={cv.summary || ""}
                        onChange={(e) =>
                          handleEditField("summary", e.target.value)
                        }
                        rows={4}
                        className="mt-1 w-full resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--app-accent)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={isEditMode ? "lg:col-span-2" : "lg:col-span-3"}>
            <div className="flex justify-center">
              <div
                ref={cvRef}
                className="w-full max-w-5xl overflow-hidden rounded-[34px] border border-black/10 shadow-[0_30px_80px_rgba(36,31,26,0.12)] print:shadow-none print:border-none"
                style={{ aspectRatio: "210/297" }}
              >
                <CVDocument
                  cv={previewCv}
                  template={activeTemplate}
                  profileImage={profileImage}
                  showProfileImage={showProfileImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
