import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFolderOpen, FaPlus, FaTrash } from "react-icons/fa";
import AppHeader from "../components/AppHeader";
import CVTemplatePreview from "../components/CVTemplatePreview";
import { getTemplateById } from "../data/templates";
import { api, withAuth } from "../lib/api";
import { getCurrentUser } from "../lib/session";

export default function Dashboard() {
  const navigate = useNavigate();
  const [savedCvs, setSavedCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const loadSavedCvs = async () => {
      try {
        const { data } = await api.get("/api/cv/saved", withAuth());
        setSavedCvs(data.cvs || []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.error || "Unable to load saved CVs",
        );
      } finally {
        setLoading(false);
      }
    };

    loadSavedCvs();
  }, [navigate, user]);

  const handleOpen = (savedCv) => {
    localStorage.setItem(
      "generatedCV",
      JSON.stringify({
        cv: savedCv.cv,
        profileImage: savedCv.profileImage,
        showProfileImage: savedCv.showProfileImage,
        selectedTemplate: savedCv.selectedTemplate,
        savedCv: { id: savedCv.id },
      }),
    );
    localStorage.setItem(
      "selectedTemplate",
      savedCv.selectedTemplate || "classic-serif",
    );
    navigate("/result");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/cv/saved/${id}`, withAuth());
      setSavedCvs((prev) => prev.filter((item) => item.id !== id));
    } catch (requestError) {
      setError(
        requestError.response?.data?.error || "Unable to delete saved CV",
      );
    }
  };

  return (
    <div className="page-shell px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <AppHeader />

        <section className="mt-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--app-muted)]">
                Dashboard
              </p>
              <h1 className="mt-2 text-5xl font-semibold leading-none text-[var(--app-ink)] md:text-6xl">
                Your saved CV library.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--app-muted)]">
                Open any saved version, keep separate resumes for different
                roles, and continue editing without starting over.
              </p>
            </div>
            <button
              onClick={() => navigate("/template-select")}
              className="brand-button flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold"
            >
              <FaPlus /> Create another CV
            </button>
          </div>

          {error && (
            <div className="mb-6 rounded-[24px] border border-[#9b5c2e]/20 bg-[#9b5c2e]/10 px-5 py-4 text-sm text-[#7e4c25]">
              {error}
            </div>
          )}

          {loading ? (
            <div className="surface-panel rounded-[30px] p-10 text-center text-[var(--app-muted)]">
              Loading saved CVs...
            </div>
          ) : savedCvs.length === 0 ? (
            <div className="surface-panel rounded-[30px] p-10 text-center">
              <h2 className="text-4xl font-semibold text-[var(--app-ink)]">
                No saved CVs yet
              </h2>
              <p className="mt-3 text-base text-[var(--app-muted)]">
                Generate a CV while logged in and it will appear here
                automatically.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {savedCvs.map((savedCv) => {
                const template = getTemplateById(savedCv.selectedTemplate);

                return (
                  <div
                    key={savedCv.id}
                    className="surface-panel rounded-[30px] p-4"
                  >
                    <div className="aspect-[0.82] overflow-hidden rounded-[24px]">
                      <CVTemplatePreview template={template} />
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-semibold text-[var(--app-ink)]">
                          {savedCv.label || savedCv.cv?.title || "Saved CV"}
                        </h2>
                        <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[var(--app-muted)]">
                          {template.name} ·{" "}
                          {new Date(savedCv.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div
                        className="h-10 w-10 rounded-2xl border border-black/10"
                        style={{ backgroundColor: template.accent }}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
                      {savedCv.cv?.fullName || "Untitled"} ·{" "}
                      {savedCv.cv?.title || "Draft"}
                    </p>
                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => handleOpen(savedCv)}
                        className="brand-button flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold"
                      >
                        <FaFolderOpen /> Open
                      </button>
                      <button
                        onClick={() => handleDelete(savedCv.id)}
                        className="secondary-button flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
