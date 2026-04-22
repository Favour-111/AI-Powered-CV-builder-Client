import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaCheck } from "react-icons/fa";
import { getTemplateById } from "../data/templates";
import { api, withAuth } from "../lib/api";
import { getCurrentUser } from "../lib/session";

const Generating = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing...");
  const selectedTemplate = getTemplateById(
    localStorage.getItem("selectedTemplate"),
  );
  const user = getCurrentUser();

  useEffect(() => {
    const generateCV = async () => {
      try {
        const formData = JSON.parse(localStorage.getItem("cvFormData"));
        const mode = localStorage.getItem("mode");
        const selectedTemplate = localStorage.getItem("selectedTemplate");

        setStatus("Analyzing your information...");
        setProgress(20);

        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 80) return prev;
            return prev + 10;
          });
        }, 500);

        setStatus("Crafting your CV with AI...");
        setProgress(40);

        const payload = { ...formData };
        const formDataObj = new FormData();
        formDataObj.append("cvData", JSON.stringify(payload));
        formDataObj.append("mode", mode);
        formDataObj.append("showProfileImage", formData.showProfileImage);
        formDataObj.append("selectedTemplate", selectedTemplate);
        formDataObj.append(
          "cvLabel",
          formData.targetRole ||
            formData.title ||
            `${formData.fullName || "Untitled"} CV`,
        );

        if (formData.profileImage instanceof File) {
          formDataObj.append("profileImage", formData.profileImage);
        }

        const { data } = await api.post(
          "/api/cv/generate",
          formDataObj,
          withAuth({
            headers: { "Content-Type": "multipart/form-data" },
          }),
        );

        clearInterval(progressInterval);
        setProgress(100);
        setStatus("CV generated successfully!");

        // Store the result
        localStorage.setItem("generatedCV", JSON.stringify(data));

        setTimeout(() => {
          navigate("/result");
        }, 1500);
      } catch (error) {
        console.error(error);
        setStatus("Error generating CV. Please try again.");
        setProgress(0);
      }
    };

    generateCV();
  }, [navigate]);

  return (
    <div className="page-shell flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto max-w-md text-center">
        <div className="surface-panel rounded-[34px] p-12">
          <div className="mb-8">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-black/10 bg-white/50">
              {progress === 100 ? (
                <FaCheck className="text-5xl text-[var(--app-warm)]" />
              ) : (
                <FaSpinner className="animate-spin text-5xl text-[var(--app-accent)]" />
              )}
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--app-muted)]">
              Building Resume
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-[var(--app-ink)]">
              {progress === 100 ? "Ready!" : "Generating Your CV"}
            </h1>

            <p className="mb-2 mt-4 text-sm uppercase tracking-[0.24em] text-[var(--app-muted)]">
              Template · {selectedTemplate.name}
            </p>
            <p className="mb-6 text-[var(--app-muted)]">{status}</p>
            {user && (
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--app-muted)]">
                Saving to account automatically
              </p>
            )}

            <div className="mb-4 h-3 w-full rounded-full bg-black/8">
              <div
                className="h-3 rounded-full bg-[var(--app-accent)] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-sm text-[var(--app-muted)]">
              {progress}% Complete
            </p>
          </div>

          {progress === 100 && (
            <div className="animate-fade-in">
              <p className="font-semibold text-[var(--app-accent)]">
                Redirecting to your CV...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generating;
