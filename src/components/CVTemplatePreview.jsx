function PreviewLine({ width, dark = false }) {
  return (
    <div
      className={`h-1.5 rounded-full ${dark ? "bg-black/65" : "bg-black/18"}`}
      style={{ width: `${Math.round(width * 100)}%` }}
    />
  );
}

function PreviewParagraph({ lines, dark = false }) {
  return (
    <div className="space-y-1.5">
      {lines.map((line, index) => (
        <PreviewLine key={`${line}-${index}`} width={line} dark={dark} />
      ))}
    </div>
  );
}

function PreviewAvatar({ accent }) {
  return (
    <div
      className="h-10 w-10 rounded-full border border-white/80"
      style={{ backgroundColor: accent }}
    />
  );
}

function SidebarPreview({ template }) {
  return (
    <div className="grid h-full grid-cols-[0.72fr_1.28fr] overflow-hidden rounded-[22px]">
      <div
        className="flex flex-col gap-3 p-4 text-white"
        style={{ backgroundColor: template.accent }}
      >
        <PreviewAvatar accent="#f3eee6" />
        <div className="space-y-1">
          <div className="h-2.5 w-20 rounded-full bg-white/90" />
          <div className="h-1.5 w-14 rounded-full bg-white/60" />
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-1.5 w-12 rounded-full bg-white/70" />
          <div className="space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-white/25" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/25" />
            <div className="h-1.5 w-3/5 rounded-full bg-white/25" />
          </div>
        </div>
        <div className="space-y-1.5 pt-1">
          <div className="h-1.5 w-12 rounded-full bg-white/70" />
          <div className="grid gap-1.5">
            {[0.78, 0.62, 0.86].map((value, index) => (
              <div key={index} className="space-y-1">
                <div className="h-1.5 w-16 rounded-full bg-white/45" />
                <div className="h-1.5 rounded-full bg-white/18">
                  <div
                    className="h-1.5 rounded-full bg-white"
                    style={{ width: `${Math.round(value * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div
              className="h-2.5 w-24 rounded-full"
              style={{ backgroundColor: `${template.accent}dd` }}
            />
            <div className="h-1.5 w-16 rounded-full bg-black/20" />
          </div>
          <div className="h-2 w-10 rounded-full bg-black/10" />
        </div>
        {[0, 1, 2].map((block) => (
          <div key={block} className="space-y-2">
            <div
              className="h-1.5 w-16 rounded-full"
              style={{ backgroundColor: `${template.accent}aa` }}
            />
            <PreviewParagraph lines={template.preview.lines} />
          </div>
        ))}
      </div>
    </div>
  );
}

function GridPreview({ template }) {
  return (
    <div className="h-full rounded-[22px] p-4">
      <div
        className="mb-3 rounded-[18px] p-3"
        style={{ backgroundColor: `${template.accent}15` }}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div
              className="h-2.5 w-24 rounded-full"
              style={{ backgroundColor: template.accent }}
            />
            <div className="h-1.5 w-16 rounded-full bg-black/18" />
          </div>
          {template.preview.avatar && (
            <PreviewAvatar accent={template.accent} />
          )}
        </div>
      </div>
      <div className="grid h-[calc(100%-4rem)] grid-cols-[1.2fr_0.8fr] gap-3">
        <div className="space-y-3">
          {[0, 1, 2].map((block) => (
            <div key={block} className="rounded-2xl border border-black/8 p-3">
              <div
                className="mb-2 h-1.5 w-20 rounded-full"
                style={{ backgroundColor: `${template.accent}cc` }}
              />
              <PreviewParagraph lines={template.preview.lines} />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {[0, 1].map((block) => (
            <div key={block} className="rounded-2xl bg-black/4 p-3">
              <div
                className="mb-2 h-1.5 w-14 rounded-full"
                style={{ backgroundColor: `${template.accent}bb` }}
              />
              <PreviewParagraph lines={[0.9, 0.65, 0.76]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BannerPreview({ template }) {
  return (
    <div className="h-full rounded-[22px] overflow-hidden">
      <div
        className="p-4 text-white"
        style={{ backgroundColor: template.accent }}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-2.5 w-24 rounded-full bg-white/90" />
            <div className="h-1.5 w-16 rounded-full bg-white/55" />
          </div>
          {template.preview.avatar && <PreviewAvatar accent="#f1dfcf" />}
        </div>
      </div>
      <div className="grid h-[calc(100%-4rem)] grid-cols-[0.95fr_1.05fr] gap-3 p-4">
        <div className="space-y-3">
          {[0, 1].map((block) => (
            <div key={block} className="rounded-2xl bg-black/5 p-3">
              <div
                className="mb-2 h-1.5 w-14 rounded-full"
                style={{ backgroundColor: `${template.accent}cc` }}
              />
              <PreviewParagraph lines={[0.88, 0.72, 0.54]} />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {[0, 1, 2].map((block) => (
            <div key={block} className="rounded-2xl border border-black/8 p-3">
              <div
                className="mb-2 h-1.5 w-20 rounded-full"
                style={{ backgroundColor: `${template.accent}dd` }}
              />
              <PreviewParagraph lines={template.preview.lines} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClassicPreview({ template }) {
  return (
    <div className="h-full rounded-[22px] p-4">
      <div className="border-b border-black/10 pb-3">
        <div
          className="mx-auto h-2.5 w-28 rounded-full"
          style={{ backgroundColor: template.accent }}
        />
        <div className="mx-auto mt-1 h-1.5 w-20 rounded-full bg-black/18" />
      </div>
      <div className="space-y-3 pt-3">
        {[0, 1, 2, 3].map((block) => (
          <div key={block} className="space-y-2">
            <div
              className="h-1.5 w-20 rounded-full"
              style={{ backgroundColor: `${template.accent}cc` }}
            />
            <PreviewParagraph lines={template.preview.lines} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StackedPreview({ template }) {
  return (
    <div className="h-full rounded-[22px] p-4">
      <div
        className="rounded-[18px] p-4 text-white"
        style={{ backgroundColor: template.accent }}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="h-2.5 w-24 rounded-full bg-white/90" />
            <div className="h-1.5 w-16 rounded-full bg-white/55" />
          </div>
          {template.preview.avatar && <PreviewAvatar accent="#f1dfcf" />}
        </div>
      </div>
      <div className="mt-3 space-y-3">
        {[0, 1, 2].map((block) => (
          <div key={block} className="rounded-2xl border border-black/8 p-3">
            <div
              className="mb-2 h-1.5 w-20 rounded-full"
              style={{ backgroundColor: `${template.accent}cc` }}
            />
            <PreviewParagraph lines={template.preview.lines} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileStripPreview({ template }) {
  return (
    <div className="grid h-full grid-cols-[0.56fr_1.44fr] overflow-hidden rounded-[22px]">
      <div
        className="flex flex-col items-center gap-3 p-4 text-center text-white"
        style={{ backgroundColor: template.accent }}
      >
        <PreviewAvatar accent="#f7f1e8" />
        <div className="h-2.5 w-16 rounded-full bg-white/85" />
        <div className="h-1.5 w-12 rounded-full bg-white/50" />
        <div className="w-full space-y-1 pt-3">
          <div className="h-1.5 w-12 rounded-full bg-white/65" />
          <div className="h-1.5 w-full rounded-full bg-white/20" />
          <div className="h-1.5 w-4/5 rounded-full bg-white/20" />
          <div className="h-1.5 w-3/5 rounded-full bg-white/20" />
        </div>
      </div>
      <div className="space-y-3 p-4">
        {[0, 1, 2].map((block) => (
          <div
            key={block}
            className="space-y-2 rounded-2xl border border-black/8 p-3"
          >
            <div
              className="h-1.5 w-16 rounded-full"
              style={{ backgroundColor: `${template.accent}cc` }}
            />
            <PreviewParagraph lines={template.preview.lines} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CVTemplatePreview({ template, className = "" }) {
  const containerStyle = {
    backgroundColor: template.paper,
    color: template.ink,
  };

  return (
    <div
      className={`resume-thumbnail h-full w-full rounded-[24px] border border-black/10 shadow-[0_18px_35px_rgba(31,24,18,0.08)] ${className}`}
      style={containerStyle}
    >
      {template.preview.style === "sidebar" && (
        <SidebarPreview template={template} />
      )}
      {template.preview.style === "grid" && <GridPreview template={template} />}
      {template.preview.style === "banner" && (
        <BannerPreview template={template} />
      )}
      {template.preview.style === "classic" && (
        <ClassicPreview template={template} />
      )}
      {template.preview.style === "stacked" && (
        <StackedPreview template={template} />
      )}
      {template.preview.style === "profile-strip" && (
        <ProfileStripPreview template={template} />
      )}
    </div>
  );
}
