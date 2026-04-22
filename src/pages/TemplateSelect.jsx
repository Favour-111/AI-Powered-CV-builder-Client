import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaCheck, FaRegStar } from "react-icons/fa";
import AppHeader from "../components/AppHeader";
import CVTemplatePreview from "../components/CVTemplatePreview";
import { cvTemplates, getTemplateById } from "../data/templates";
import { getCurrentUser } from "../lib/session";

const TemplateSelect = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [selectedTemplate, setSelectedTemplate] = useState(
    localStorage.getItem("selectedTemplate") || cvTemplates[0].id,
  );
  const [filterCategory, setFilterCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(cvTemplates.map((template) => template.category))],
    [],
  );

  const filteredTemplates =
    filterCategory === "All"
      ? cvTemplates
      : cvTemplates.filter((template) => template.category === filterCategory);

  const activeTemplate = getTemplateById(selectedTemplate);

  const handleContinue = () => {
    localStorage.setItem("selectedTemplate", selectedTemplate);
    if (!user) {
      navigate("/auth", {
        state: {
          redirectTo: "/mode-select",
          authMessage:
            "Login or create an account to continue with this template.",
        },
      });
      return;
    }

    navigate("/mode-select");
  };

  return (
    <div className="page-shell px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-7xl">
        <AppHeader />
        <div className="surface-panel rounded-[32px] px-5 py-8 md:px-10 md:py-10">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--app-muted)]">
                <FaRegStar className="text-[var(--app-warm)]" />
                Free Resume Templates
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-none text-[var(--app-ink)] md:text-6xl">
                Pick the resume picture that matches the final look you want.
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--app-muted)] md:text-lg">
                Every thumbnail below is a real layout preview. The template you
                choose here will drive the final CV design on the result page so
                the generated resume stays visually close to the card you
                select.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilterCategory(category)}
                    className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                      filterCategory === category
                        ? "brand-button shadow-[0_12px_25px_rgba(24,54,74,0.18)]"
                        : "secondary-button"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-black/10 bg-white/58 p-5 shadow-[0_18px_45px_rgba(36,31,26,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--app-muted)]">
                Selected Template
              </p>
              <div className="mt-4 aspect-[0.9] overflow-hidden rounded-[28px]">
                <CVTemplatePreview template={activeTemplate} />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-semibold text-[var(--app-ink)]">
                    {activeTemplate.name}
                  </h2>
                  <p className="mt-1 text-sm uppercase tracking-[0.25em] text-[var(--app-muted)]">
                    {activeTemplate.category} · {activeTemplate.tone}
                  </p>
                </div>
                <div
                  className="h-12 w-12 rounded-2xl border border-black/10"
                  style={{ backgroundColor: activeTemplate.accent }}
                />
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--app-muted)]">
                {activeTemplate.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {activeTemplate.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-[var(--app-ink)]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <button
                onClick={handleContinue}
                className="brand-button mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold transition-all hover:translate-y-[-1px]"
              >
                Continue with {activeTemplate.name}
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
              {!user && (
                <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
                  You need to log in or sign up before continuing from template
                  selection.
                </p>
              )}
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredTemplates.map((template) => {
              const isSelected = selectedTemplate === template.id;

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`relative overflow-hidden rounded-[28px] border p-4 text-left transition-all ${
                    isSelected
                      ? "border-[var(--app-accent)] bg-white/80 shadow-[0_28px_60px_rgba(24,54,74,0.18)]"
                      : "border-black/10 bg-white/55 hover:border-[var(--app-warm)] hover:bg-white/72 hover:shadow-[0_22px_40px_rgba(36,31,26,0.08)]"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--app-accent)] text-white shadow-lg">
                      <FaCheck className="text-xs" />
                    </span>
                  )}
                  <div className="aspect-[0.82] overflow-hidden rounded-[22px]">
                    <CVTemplatePreview template={template} />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-3xl font-semibold text-[var(--app-ink)]">
                        {template.name}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[var(--app-muted)]">
                        {template.category}
                      </p>
                    </div>
                    <div
                      className="mt-1 h-4 w-4 rounded-full border border-black/10"
                      style={{ backgroundColor: template.accent }}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[var(--app-muted)]">
                    {template.summary}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-10 rounded-[28px] border border-black/10 bg-white/45 px-5 py-5 text-sm text-[var(--app-muted)] md:px-6">
            Choose the thumbnail first. Then complete AI or Manual mode. The
            final CV renderer uses the same template configuration, so the
            result page will follow the picture you picked instead of switching
            to one generic design.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelect;
