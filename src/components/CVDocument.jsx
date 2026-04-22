function sectionItems(items = []) {
  return items.filter(Boolean);
}

function allSkills(cv) {
  return [
    ...(cv.skills?.technical || []),
    ...(cv.skills?.tools || []),
    ...(cv.skills?.soft || []),
  ].filter(Boolean);
}

function ContactRow({ cv }) {
  const contactItems = [
    cv.contact?.email,
    cv.contact?.phone,
    cv.contact?.linkedin,
    cv.contact?.portfolio,
  ].filter(Boolean);

  if (!contactItems.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm opacity-80">
      {contactItems.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function SectionHeading({ children, accent, light = false }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <div className={`h-px flex-1 ${light ? "bg-white/25" : "bg-black/10"}`} />
      <h3
        className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${light ? "text-white/90" : "text-black/70"}`}
        style={light ? undefined : { color: accent }}
      >
        {children}
      </h3>
      <div className={`h-px w-10 ${light ? "bg-white/25" : "bg-black/10"}`} />
    </div>
  );
}

function ExperienceSection({ cv, accent }) {
  const experience = sectionItems(cv.experience);

  if (!experience.length) {
    return null;
  }

  return (
    <section>
      <SectionHeading accent={accent}>Experience</SectionHeading>
      <div className="space-y-5">
        {experience.map((item, index) => (
          <div key={`${item.company}-${index}`} className="space-y-1.5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h4 className="text-base font-semibold">
                  {item.role || "Role"}
                </h4>
                <p className="text-sm opacity-75">
                  {item.company || "Company"}
                </p>
              </div>
              <span className="text-xs uppercase tracking-[0.18em] opacity-55">
                {item.duration || "Duration"}
              </span>
            </div>
            <ul className="space-y-1.5 pl-4 text-sm leading-6 opacity-85 marker:text-[10px] list-disc">
              {sectionItems(item.bullets).map((bullet, bulletIndex) => (
                <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function EducationSection({ cv, accent }) {
  const education = sectionItems(cv.education);

  if (!education.length) {
    return null;
  }

  return (
    <section>
      <SectionHeading accent={accent}>Education</SectionHeading>
      <div className="space-y-3">
        {education.map((item, index) => (
          <div key={`${item.school}-${index}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h4 className="text-sm font-semibold">
                {item.degree || "Degree"}
              </h4>
              <span className="text-xs uppercase tracking-[0.18em] opacity-55">
                {item.year || "Year"}
              </span>
            </div>
            <p className="text-sm opacity-75">{item.school || "School"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection({ cv, accent }) {
  const projects = sectionItems(cv.projects);

  if (!projects.length) {
    return null;
  }

  return (
    <section>
      <SectionHeading accent={accent}>Projects</SectionHeading>
      <div className="space-y-4">
        {projects.map((item, index) => (
          <div key={`${item.name}-${index}`} className="space-y-1.5">
            <h4 className="text-sm font-semibold">{item.name || "Project"}</h4>
            {item.description && (
              <p className="text-sm opacity-80">{item.description}</p>
            )}
            <ul className="space-y-1.5 pl-4 text-sm leading-6 opacity-85 marker:text-[10px] list-disc">
              {sectionItems(item.bullets).map((bullet, bulletIndex) => (
                <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function AwardsSection({ cv, accent }) {
  const awards = sectionItems(cv.extras?.awards);

  if (!awards.length) {
    return null;
  }

  return (
    <section>
      <SectionHeading accent={accent}>Awards</SectionHeading>
      <ul className="space-y-1.5 text-sm opacity-85">
        {awards.map((award) => (
          <li key={award}>{award}</li>
        ))}
      </ul>
    </section>
  );
}

function SidebarPanel({ cv, accent, profileImage, showProfileImage }) {
  const skills = allSkills(cv).slice(0, 8);
  const languages = sectionItems(cv.extras?.languages);

  return (
    <aside
      className="space-y-6 rounded-[30px] p-7 text-white"
      style={{ backgroundColor: accent }}
    >
      <div className="space-y-4 text-center">
        {showProfileImage && profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="mx-auto h-24 w-24 rounded-full border border-white/60 object-cover"
          />
        ) : (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/35 bg-white/10 text-2xl font-semibold">
            {(cv.fullName || "CV").slice(0, 2).toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="text-[28px] font-semibold leading-tight">
            {cv.fullName || "Your Name"}
          </h1>
          <p className="mt-1 text-sm uppercase tracking-[0.25em] text-white/70">
            {cv.title || "Professional Title"}
          </p>
        </div>
      </div>

      <div className="space-y-3 text-sm text-white/85">
        {[
          cv.contact?.email,
          cv.contact?.phone,
          cv.contact?.linkedin,
          cv.contact?.portfolio,
        ]
          .filter(Boolean)
          .map((item) => (
            <p key={item}>{item}</p>
          ))}
      </div>

      {skills.length > 0 && (
        <div>
          <SectionHeading accent={accent} light>
            Skills
          </SectionHeading>
          <div className="space-y-3">
            {skills.map((skill, index) => (
              <div key={`${skill}-${index}`} className="space-y-1.5">
                <div className="text-sm text-white/90">{skill}</div>
                <div className="h-1.5 rounded-full bg-white/15">
                  <div
                    className="h-1.5 rounded-full bg-white"
                    style={{ width: `${78 - index * 4}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {languages.length > 0 && (
        <div>
          <SectionHeading accent={accent} light>
            Languages
          </SectionHeading>
          <div className="space-y-2 text-sm text-white/90">
            {languages.map((language) => (
              <p key={language}>{language}</p>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

function ClassicLayout({ cv, template }) {
  return (
    <div className="h-full p-10 text-[color:var(--resume-ink)]">
      <header className="border-b border-black/10 pb-6 text-center">
        <h1 className="font-serif text-4xl font-semibold uppercase tracking-[0.14em]">
          {cv.fullName || "Your Name"}
        </h1>
        <p className="mt-2 text-sm uppercase tracking-[0.3em] opacity-60">
          {cv.title || "Professional Title"}
        </p>
        <div className="mt-4 flex justify-center">
          <ContactRow cv={cv} />
        </div>
      </header>

      <div className="space-y-7 pt-7">
        {cv.summary && (
          <section>
            <SectionHeading accent={template.accent}>Profile</SectionHeading>
            <p className="text-sm leading-7 opacity-85">{cv.summary}</p>
          </section>
        )}
        <ExperienceSection cv={cv} accent={template.accent} />
        <ProjectsSection cv={cv} accent={template.accent} />
        <EducationSection cv={cv} accent={template.accent} />
        <AwardsSection cv={cv} accent={template.accent} />
      </div>
    </div>
  );
}

function SidebarLayout({ cv, template, profileImage, showProfileImage }) {
  return (
    <div className="grid h-full grid-cols-[0.85fr_1.35fr] gap-6 p-6 text-[color:var(--resume-ink)]">
      <SidebarPanel
        cv={cv}
        accent={template.accent}
        profileImage={profileImage}
        showProfileImage={showProfileImage}
      />
      <div className="space-y-6 rounded-[28px] border border-black/8 bg-white/55 p-7">
        {cv.summary && (
          <section>
            <SectionHeading accent={template.accent}>Profile</SectionHeading>
            <p className="text-sm leading-7 opacity-85">{cv.summary}</p>
          </section>
        )}
        <ExperienceSection cv={cv} accent={template.accent} />
        <ProjectsSection cv={cv} accent={template.accent} />
        <EducationSection cv={cv} accent={template.accent} />
        <AwardsSection cv={cv} accent={template.accent} />
      </div>
    </div>
  );
}

function GridLayout({ cv, template, profileImage, showProfileImage }) {
  const skills = allSkills(cv).slice(0, 10);

  return (
    <div className="h-full p-7 text-[color:var(--resume-ink)]">
      <header
        className="rounded-[28px] p-7"
        style={{ backgroundColor: `${template.accent}14` }}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.34em] opacity-60">
              Selected Template
            </p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight">
              {cv.fullName || "Your Name"}
            </h1>
            <p className="mt-2 text-base opacity-75">
              {cv.title || "Professional Title"}
            </p>
            <div className="mt-4">
              <ContactRow cv={cv} />
            </div>
          </div>
          {showProfileImage && profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-24 w-24 rounded-[26px] border border-black/10 object-cover"
            />
          ) : (
            <div
              className="flex h-24 w-24 items-center justify-center rounded-[26px] text-2xl font-semibold text-white"
              style={{ backgroundColor: template.accent }}
            >
              {(cv.fullName || "CV").slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
      </header>

      <div className="grid h-[calc(100%-10rem)] grid-cols-[1.25fr_0.75fr] gap-5 pt-5">
        <div className="space-y-5">
          {cv.summary && (
            <section className="rounded-[26px] border border-black/8 bg-white/55 p-6">
              <SectionHeading accent={template.accent}>Profile</SectionHeading>
              <p className="text-sm leading-7 opacity-85">{cv.summary}</p>
            </section>
          )}
          <div className="rounded-[26px] border border-black/8 bg-white/55 p-6">
            <ExperienceSection cv={cv} accent={template.accent} />
          </div>
          <div className="rounded-[26px] border border-black/8 bg-white/55 p-6">
            <ProjectsSection cv={cv} accent={template.accent} />
          </div>
        </div>
        <div className="space-y-5">
          {skills.length > 0 && (
            <section className="rounded-[26px] border border-black/8 bg-white/55 p-6">
              <SectionHeading accent={template.accent}>Skills</SectionHeading>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: `${template.accent}15`,
                      color: template.accent,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
          <section className="rounded-[26px] border border-black/8 bg-white/55 p-6">
            <EducationSection cv={cv} accent={template.accent} />
          </section>
          <section className="rounded-[26px] border border-black/8 bg-white/55 p-6">
            <AwardsSection cv={cv} accent={template.accent} />
          </section>
        </div>
      </div>
    </div>
  );
}

function BannerLayout({ cv, template, profileImage, showProfileImage }) {
  const skills = allSkills(cv).slice(0, 6);

  return (
    <div className="h-full p-7 text-[color:var(--resume-ink)]">
      <header
        className="rounded-[32px] px-8 py-7 text-white"
        style={{ backgroundColor: template.accent }}
      >
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.36em] text-white/60">
              Resume
            </p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight">
              {cv.fullName || "Your Name"}
            </h1>
            <p className="mt-2 text-base text-white/75">
              {cv.title || "Professional Title"}
            </p>
          </div>
          {showProfileImage && profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-24 w-24 rounded-[28px] border border-white/30 object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/20 bg-white/10 text-2xl font-semibold">
              {(cv.fullName || "CV").slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div className="mt-5 text-sm text-white/80">
          <ContactRow cv={cv} />
        </div>
      </header>

      <div className="grid h-[calc(100%-10rem)] grid-cols-[0.85fr_1.15fr] gap-5 pt-5">
        <div className="space-y-5">
          {cv.summary && (
            <section className="rounded-[28px] border border-black/8 bg-white/55 p-6">
              <SectionHeading accent={template.accent}>Profile</SectionHeading>
              <p className="text-sm leading-7 opacity-85">{cv.summary}</p>
            </section>
          )}
          {skills.length > 0 && (
            <section className="rounded-[28px] border border-black/8 bg-white/55 p-6">
              <SectionHeading accent={template.accent}>
                Core Skills
              </SectionHeading>
              <div className="space-y-2 text-sm opacity-85">
                {skills.map((skill) => (
                  <p key={skill}>{skill}</p>
                ))}
              </div>
            </section>
          )}
          <section className="rounded-[28px] border border-black/8 bg-white/55 p-6">
            <EducationSection cv={cv} accent={template.accent} />
          </section>
        </div>
        <div className="space-y-5">
          <section className="rounded-[28px] border border-black/8 bg-white/55 p-6">
            <ExperienceSection cv={cv} accent={template.accent} />
          </section>
          <section className="rounded-[28px] border border-black/8 bg-white/55 p-6">
            <ProjectsSection cv={cv} accent={template.accent} />
          </section>
          <section className="rounded-[28px] border border-black/8 bg-white/55 p-6">
            <AwardsSection cv={cv} accent={template.accent} />
          </section>
        </div>
      </div>
    </div>
  );
}

function StackedLayout({ cv, template, profileImage, showProfileImage }) {
  const skills = allSkills(cv).slice(0, 8);

  return (
    <div className="h-full p-7 text-[color:var(--resume-ink)]">
      <header
        className="rounded-[30px] px-8 py-7 text-white"
        style={{ backgroundColor: template.accent }}
      >
        <div className="flex items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-white/65">
              Editorial Resume
            </p>
            <h1 className="mt-2 text-4xl font-semibold leading-tight">
              {cv.fullName || "Your Name"}
            </h1>
            <p className="mt-2 text-base text-white/75">
              {cv.title || "Professional Title"}
            </p>
          </div>
          {showProfileImage && profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="h-24 w-24 rounded-[26px] border border-white/30 object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-[26px] border border-white/20 bg-white/10 text-2xl font-semibold">
              {(cv.fullName || "CV").slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div className="mt-4 text-sm text-white/80">
          <ContactRow cv={cv} />
        </div>
      </header>

      <div className="grid h-[calc(100%-9.5rem)] gap-5 pt-5">
        {cv.summary && (
          <section className="rounded-[28px] border border-black/8 bg-white/55 p-6">
            <SectionHeading accent={template.accent}>Profile</SectionHeading>
            <p className="text-sm leading-7 opacity-85">{cv.summary}</p>
          </section>
        )}
        <div className="grid grid-cols-[1.15fr_0.85fr] gap-5">
          <div className="space-y-5">
            <section className="rounded-[28px] border border-black/8 bg-white/55 p-6">
              <ExperienceSection cv={cv} accent={template.accent} />
            </section>
            <section className="rounded-[28px] border border-black/8 bg-white/55 p-6">
              <ProjectsSection cv={cv} accent={template.accent} />
            </section>
          </div>
          <div className="space-y-5">
            {skills.length > 0 && (
              <section className="rounded-[28px] border border-black/8 bg-white/55 p-6">
                <SectionHeading accent={template.accent}>Skills</SectionHeading>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: `${template.accent}15`,
                        color: template.accent,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
            <section className="rounded-[28px] border border-black/8 bg-white/55 p-6">
              <EducationSection cv={cv} accent={template.accent} />
            </section>
            <section className="rounded-[28px] border border-black/8 bg-white/55 p-6">
              <AwardsSection cv={cv} accent={template.accent} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileStripLayout({ cv, template, profileImage, showProfileImage }) {
  const skills = allSkills(cv).slice(0, 7);

  return (
    <div className="grid h-full grid-cols-[0.62fr_1.38fr] gap-5 p-6 text-[color:var(--resume-ink)]">
      <aside
        className="space-y-6 rounded-[30px] px-5 py-7 text-center text-white"
        style={{ backgroundColor: template.accent }}
      >
        {showProfileImage && profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="mx-auto h-24 w-24 rounded-[26px] border border-white/40 object-cover"
          />
        ) : (
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[26px] border border-white/25 bg-white/10 text-2xl font-semibold">
            {(cv.fullName || "CV").slice(0, 2).toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="text-[30px] font-semibold leading-tight">
            {cv.fullName || "Your Name"}
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white/70">
            {cv.title || "Professional Title"}
          </p>
        </div>
        <div className="space-y-2 text-sm text-white/85">
          {[
            cv.contact?.email,
            cv.contact?.phone,
            cv.contact?.linkedin,
            cv.contact?.portfolio,
          ]
            .filter(Boolean)
            .map((item) => (
              <p key={item}>{item}</p>
            ))}
        </div>
        {skills.length > 0 && (
          <div>
            <SectionHeading accent={template.accent} light>
              Skills
            </SectionHeading>
            <div className="space-y-2 text-sm text-white/90">
              {skills.map((skill) => (
                <p key={skill}>{skill}</p>
              ))}
            </div>
          </div>
        )}
      </aside>

      <div className="space-y-5 rounded-[30px] border border-black/8 bg-white/55 p-6">
        {cv.summary && (
          <section>
            <SectionHeading accent={template.accent}>Profile</SectionHeading>
            <p className="text-sm leading-7 opacity-85">{cv.summary}</p>
          </section>
        )}
        <ExperienceSection cv={cv} accent={template.accent} />
        <ProjectsSection cv={cv} accent={template.accent} />
        <EducationSection cv={cv} accent={template.accent} />
        <AwardsSection cv={cv} accent={template.accent} />
      </div>
    </div>
  );
}

export default function CVDocument({
  cv,
  template,
  profileImage,
  showProfileImage,
}) {
  const documentStyle = {
    backgroundColor: template.paper,
    color: template.ink,
    "--resume-ink": template.ink,
  };

  return (
    <div
      className="h-full w-full overflow-hidden rounded-[34px]"
      style={documentStyle}
    >
      {template.preview.style === "classic" && (
        <ClassicLayout cv={cv} template={template} />
      )}
      {template.preview.style === "sidebar" && (
        <SidebarLayout
          cv={cv}
          template={template}
          profileImage={profileImage}
          showProfileImage={showProfileImage}
        />
      )}
      {template.preview.style === "grid" && (
        <GridLayout
          cv={cv}
          template={template}
          profileImage={profileImage}
          showProfileImage={showProfileImage}
        />
      )}
      {template.preview.style === "banner" && (
        <BannerLayout
          cv={cv}
          template={template}
          profileImage={profileImage}
          showProfileImage={showProfileImage}
        />
      )}
      {template.preview.style === "stacked" && (
        <StackedLayout
          cv={cv}
          template={template}
          profileImage={profileImage}
          showProfileImage={showProfileImage}
        />
      )}
      {template.preview.style === "profile-strip" && (
        <ProfileStripLayout
          cv={cv}
          template={template}
          profileImage={profileImage}
          showProfileImage={showProfileImage}
        />
      )}
    </div>
  );
}
