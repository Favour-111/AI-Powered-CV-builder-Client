import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiBrainLight } from "react-icons/pi";
import AppHeader from "../components/AppHeader";
import CVTemplatePreview from "../components/CVTemplatePreview";
import { cvTemplates } from "../data/templates";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="page-shell px-4 py-5 md:px-6 md:py-8">
      <div className="mx-auto max-w-7xl">
        <AppHeader />

        <section className="grid gap-8 px-1 pb-6 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/55 px-4 py-3 text-sm font-medium text-[var(--app-muted)]">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--app-accent)] text-white">
                <PiBrainLight className="text-[24px]" />
              </span>
              AI-powered CV builder
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-none text-[var(--app-ink)] md:text-7xl">
              Build a job-winning CV with a template that already looks right.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--app-muted)] md:text-lg">
              Start from a real resume picture, generate the content with AI or
              fill it in manually, then export a final design that stays close
              to the template you selected.
            </p>

            <div className="mt-8 space-y-3 text-sm text-[var(--app-muted)] md:text-base">
              {[
                "Your first resume stays free.",
                "Unlimited PDF downloads. No watermark.",
                "Takes about five minutes to get a polished result.",
                "Create an account to save multiple CV versions.",
              ].map((item) => (
                <p key={item} className="flex items-center gap-2">
                  <IoMdCheckmarkCircleOutline className="text-lg text-[var(--app-warm)]" />
                  {item}
                </p>
              ))}
            </div>

            <button
              onClick={() => navigate("/template-select")}
              className="brand-button mt-8 flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold shadow-[0_18px_36px_rgba(24,54,74,0.22)] transition-all hover:translate-y-[-1px] md:text-base"
            >
              Get started for free
              <FaArrowRight />
            </button>
          </div>

          <div className="surface-panel rounded-[36px] p-5 md:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-4 rounded-[30px] bg-white/45 p-4 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--app-muted)]">
                      Resume Gallery
                    </p>
                    <h2 className="mt-1 text-4xl font-semibold text-[var(--app-ink)]">
                      Free Resume Templates
                    </h2>
                  </div>
                  <div className="rounded-full border border-black/10 bg-white/65 px-4 py-2 text-xs font-medium text-[var(--app-muted)]">
                    Popular styles
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {cvTemplates.slice(0, 6).map((template) => (
                    <div
                      key={template.id}
                      className="overflow-hidden rounded-[24px] border border-black/10 bg-white/70 p-3"
                    >
                      <div className="aspect-[0.82] overflow-hidden rounded-[20px]">
                        <CVTemplatePreview template={template} />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-[var(--app-ink)]">
                        {template.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
