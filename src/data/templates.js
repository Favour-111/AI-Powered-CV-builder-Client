export const cvTemplates = [
  {
    id: "classic-serif",
    name: "Classic",
    category: "Popular",
    tone: "Traditional",
    accent: "#1f2937",
    paper: "#f7f1e8",
    ink: "#241f1a",
    summary:
      "Single-column resume with strong section dividers and restrained typography.",
    features: ["ATS-friendly", "Dense content", "Formal hierarchy"],
    preview: {
      style: "classic",
      header: "top",
      sidebar: false,
      avatar: false,
      lines: [0.88, 0.58, 0.76, 0.7],
    },
  },
  {
    id: "atlantic-sidebar",
    name: "Atlantic Blue",
    category: "Simple",
    tone: "Consulting",
    accent: "#18364a",
    paper: "#f7f1e8",
    ink: "#1d2430",
    summary:
      "Tall left sidebar with portrait, contact details, skills, and compact main content.",
    features: ["Photo-ready", "Two-column", "Executive feel"],
    preview: {
      style: "sidebar",
      header: "split",
      sidebar: true,
      avatar: true,
      lines: [0.82, 0.52, 0.72, 0.64],
    },
  },
  {
    id: "minimal-grid",
    name: "Modern Grid",
    category: "Modern",
    tone: "Product",
    accent: "#9b5c2e",
    paper: "#f7f1e8",
    ink: "#2f241c",
    summary:
      "Editorial header, balanced spacing, and modular content blocks for a modern layout.",
    features: ["Wide header", "Modular cards", "Clean spacing"],
    preview: {
      style: "grid",
      header: "wide",
      sidebar: false,
      avatar: true,
      lines: [0.9, 0.68, 0.54, 0.8],
    },
  },
  {
    id: "creative-banner",
    name: "Creative Banner",
    category: "Creative",
    tone: "Brand",
    accent: "#6e3f2e",
    paper: "#f7f1e8",
    ink: "#2c211a",
    summary:
      "Statement banner with rounded profile card and bold content stripes.",
    features: ["Visual header", "Rounded blocks", "Portfolio friendly"],
    preview: {
      style: "banner",
      header: "banner",
      sidebar: false,
      avatar: true,
      lines: [0.86, 0.46, 0.66, 0.74],
    },
  },
  {
    id: "sage-profile",
    name: "Sage Profile",
    category: "Popular",
    tone: "Balanced",
    accent: "#4f6b5a",
    paper: "#f7f1e8",
    ink: "#233028",
    summary:
      "Vertical profile strip with a calm palette, clean hierarchy, and balanced spacing.",
    features: ["Portrait strip", "Clean summary", "Friendly ATS layout"],
    preview: {
      style: "profile-strip",
      header: "strip",
      sidebar: true,
      avatar: true,
      lines: [0.82, 0.58, 0.7, 0.64],
    },
  },
  {
    id: "editorial-stack",
    name: "Editorial Stack",
    category: "Modern",
    tone: "Editorial",
    accent: "#7d4d3b",
    paper: "#f7f1e8",
    ink: "#2e211b",
    summary:
      "Stacked story-like layout with wide header blocks and editorial section rhythm.",
    features: ["Wide sections", "Narrative flow", "Portfolio ready"],
    preview: {
      style: "stacked",
      header: "editorial",
      sidebar: false,
      avatar: true,
      lines: [0.9, 0.76, 0.62, 0.7],
    },
  },
  {
    id: "executive-stone",
    name: "Executive Stone",
    category: "Simple",
    tone: "Executive",
    accent: "#39434d",
    paper: "#f7f1e8",
    ink: "#23282d",
    summary:
      "Refined single-column layout for leadership resumes and formal applications.",
    features: ["Minimal framing", "Leadership tone", "High readability"],
    preview: {
      style: "classic",
      header: "top",
      sidebar: false,
      avatar: false,
      lines: [0.84, 0.64, 0.8, 0.68],
    },
  },
  {
    id: "copper-grid",
    name: "Copper Grid",
    category: "Creative",
    tone: "Product",
    accent: "#b86a38",
    paper: "#f7f1e8",
    ink: "#2f241c",
    summary:
      "Warm modular grid with stronger contrast for product, design, and startup roles.",
    features: ["Modular blocks", "High contrast", "Contemporary"],
    preview: {
      style: "grid",
      header: "wide",
      sidebar: false,
      avatar: true,
      lines: [0.92, 0.7, 0.58, 0.8],
    },
  },
];

export function getTemplateById(templateId) {
  return (
    cvTemplates.find((template) => template.id === templateId) || cvTemplates[0]
  );
}
