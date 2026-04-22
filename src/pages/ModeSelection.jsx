import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { LuBrain } from "react-icons/lu";
import { BsCheck2Circle } from "react-icons/bs";
import AppHeader from "../components/AppHeader";
import CVTemplatePreview from "../components/CVTemplatePreview";
import { getTemplateById } from "../data/templates";

const ModeSelection = () => {
  const navigate = useNavigate();
  const selectedTemplate = getTemplateById(
    localStorage.getItem("selectedTemplate"),
  );

  const modes = [
    {
      id: "ai",
      icon: LuBrain,
      title: "AI Mode",
      subtitle: "Guided & Smart",
      description:
        "Let AI generate your CV content. Perfect for busy professionals who want instant results.",
      benefits: [
        "AI-powered content generation",
        "Smart suggestions for improvements",
        "Fast and guided in a few minutes",
        "Great for career changers",
      ],
      route: "/ai",
    },
    {
      id: "manual",
      icon: FiEdit3,
      title: "Manual Mode",
      subtitle: "Full Control",
      description:
        "Build your CV step by step. Perfect for those who want complete control and customization.",
      benefits: [
        "Complete control over content",
        "Detailed form guidance",
        "Section-by-section editing",
        "Full customization options",
      ],
      route: "/manual",
    },
  ];

  const handleModeSelect = (route) => {
    navigate(route);
  };

  return (
    <div className="page-shell px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto max-w-6xl">
        <AppHeader />
        <div className="mb-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--app-muted)]">
              Build Mode
            </p>
            <h1 className="mt-3 text-5xl font-semibold leading-none text-[var(--app-ink)] md:text-6xl">
              Choose how you want to fill the template.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--app-muted)] md:text-lg">
              Your selected design is locked in. The only choice here is whether
              AI should draft the content for you or whether you want to write
              each section yourself.
            </p>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white/55 p-4 shadow-[0_24px_60px_rgba(36,31,26,0.08)]">
            <div className="aspect-[0.92] overflow-hidden rounded-[24px]">
              <CVTemplatePreview template={selectedTemplate} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--app-muted)]">
                  Selected design
                </p>
                <h2 className="text-3xl font-semibold text-[var(--app-ink)]">
                  {selectedTemplate.name}
                </h2>
              </div>
              <div
                className="h-10 w-10 rounded-2xl border border-black/10"
                style={{ backgroundColor: selectedTemplate.accent }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {modes.map((mode) => {
            const Icon = mode.icon;

            return (
              <div key={mode.id} className="surface-panel rounded-[30px] p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-[var(--app-accent)] text-white">
                    <Icon className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-semibold text-[var(--app-ink)]">
                      {mode.title}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.24em] text-[var(--app-muted)]">
                      {mode.subtitle}
                    </p>
                  </div>
                </div>

                <p className="mb-6 text-base leading-7 text-[var(--app-muted)]">
                  {mode.description}
                </p>

                <div className="space-y-2 mb-8">
                  {mode.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-[var(--app-ink)]"
                    >
                      <BsCheck2Circle className="text-[var(--app-warm)]" />
                      <p>{benefit}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleModeSelect(mode.route)}
                  className="brand-button flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-sm font-semibold transition-all"
                >
                  Choose {mode.title}
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;
