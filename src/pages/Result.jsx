import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload, FaEdit, FaHome, FaPrint } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Result = () => {
  const navigate = useNavigate();
  const [cvData, setCvData] = useState(null);
  const [template, setTemplate] = useState("modern");
  const [isEditMode, setIsEditMode] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    experience: true,
    education: true,
    projects: true,
    awards: true,
    languages: true,
  });
  const cvRef = useRef();

  useEffect(() => {
    const data = localStorage.getItem("generatedCV");
    const selectedTemplate = localStorage.getItem("selectedTemplate");
    if (data) {
      setCvData(JSON.parse(data));
      setTemplate(selectedTemplate || "modern");
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

  if (!cvData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const cv = cvData.cv;
  const profileImage = cvData.profileImage;
  const showProfileImage = cvData.showProfileImage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Your CV is Ready!
          </h1>
          <p className="text-gray-600">
            Download, edit, or share your professional CV
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={downloadPDF}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2"
          >
            <FaDownload /> Download PDF
          </button>
          <button
            onClick={printCV}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 flex items-center gap-2"
          >
            <FaPrint /> Print CV
          </button>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              isEditMode
                ? "bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700"
                : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600"
            }`}
          >
            <FaEdit /> {isEditMode ? "Done Editing" : "Edit CV"}
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-2xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center gap-2"
          >
            <FaHome /> Create New CV
          </button>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Edit Panel */}
          {isEditMode && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Edit Sections
                </h2>

                <div className="space-y-4">
                  {Object.entries(visibleSections).map(
                    ([section, isVisible]) => (
                      <div
                        key={section}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <label className="flex items-center gap-3 cursor-pointer flex-1">
                          <input
                            type="checkbox"
                            checked={isVisible}
                            onChange={() => toggleSection(section)}
                            className="w-5 h-5 rounded border-gray-300 text-indigo-600 cursor-pointer"
                          />
                          <span className="font-medium text-gray-700 capitalize">
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

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Quick Edit
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={cv.fullName || ""}
                        onChange={(e) =>
                          handleEditField("fullName", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={cv.title || ""}
                        onChange={(e) =>
                          handleEditField("title", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={cv.contact?.email || ""}
                        onChange={(e) =>
                          handleEditField("contact.email", e.target.value)
                        }
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Professional Summary
                      </label>
                      <textarea
                        value={cv.summary || ""}
                        onChange={(e) =>
                          handleEditField("summary", e.target.value)
                        }
                        rows={4}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CV Preview */}
          <div className={isEditMode ? "lg:col-span-2" : "lg:col-span-3"}>
            <div className="flex justify-center">
              <div
                ref={cvRef}
                className="w-full max-w-4xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden print:shadow-none print:border-none bg-white"
                style={{ aspectRatio: "210/297" }}
              >
                <div className="h-full grid grid-cols-1 md:grid-cols-2">
                  {/* Left panel */}
                  <div className="relative bg-gradient-to-b from-indigo-800 to-indigo-600 text-white p-8">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_60%)]"></div>
                    <div className="relative z-10 space-y-4">
                      {showProfileImage && profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-32 h-32 rounded-full border-4 border-white object-cover mx-auto shadow-lg"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full border-4 border-white bg-indigo-700/70 mx-auto flex items-center justify-center text-3xl font-bold">
                          {(cv.fullName || "?").slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div className="text-center space-y-1">
                        <h1 className="text-3xl font-black tracking-wide uppercase drop-shadow-lg">
                          {cv.fullName || "Your Name"}
                        </h1>
                        <p className="text-lg font-semibold opacity-90">
                          {cv.title || "Web Developer"}
                        </p>
                      </div>

                      <div className="mt-4 border-t border-white/30 pt-4 space-y-2 text-sm">
                        {cv.contact?.email && <p>✉️ {cv.contact.email}</p>}
                        {cv.contact?.phone && <p>📞 {cv.contact.phone}</p>}
                        {cv.contact?.linkedin && (
                          <p>🔗 {cv.contact.linkedin}</p>
                        )}
                        {cv.contact?.portfolio && (
                          <p>🌐 {cv.contact.portfolio}</p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold mt-4">Skills</h3>
                        <div className="space-y-2 mt-2">
                          {[
                            ...new Set([
                              ...(cv.skills?.technical || []),
                              ...(cv.skills?.tools || []),
                              ...(cv.skills?.soft || []),
                            ]),
                          ]
                            .filter(Boolean)
                            .slice(0, 7)
                            .map((skill, idx) => (
                              <div key={idx} className="space-y-1">
                                <p className="text-sm font-medium text-white">
                                  {skill}
                                </p>
                                <div className="h-2 bg-white/30 rounded-full">
                                  <div
                                    className="h-2 bg-white rounded-full"
                                    style={{
                                      width: `${70 + (idx % 5) * 5}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {visibleSections.languages &&
                        cv.extras?.languages?.filter(Boolean).length > 0 && (
                          <div>
                            <h3 className="text-lg font-bold mt-4">
                              Languages
                            </h3>
                            <div className="space-y-2 mt-2 text-sm">
                              {cv.extras.languages
                                .filter(Boolean)
                                .map((lang, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-center justify-between"
                                  >
                                    <span>{lang}</span>
                                    <div className="h-2 w-24 bg-white/30 rounded-full">
                                      <div
                                        className="h-2 bg-white rounded-full"
                                        style={{
                                          width: `${80 - idx * 10}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                      {cv.summary && (
                        <div>
                          <h3 className="text-lg font-bold mt-4">About</h3>
                          <p className="text-sm text-white/90 mt-2 leading-relaxed">
                            {cv.summary}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right panel */}
                  <div className="p-8 bg-white text-gray-800 overflow-y-auto">
                    <div className="space-y-6">
                      {visibleSections.experience && (
                        <section>
                          <h3 className="text-2xl font-bold mb-3">
                            Professional Experience
                          </h3>
                          <div className="space-y-4">
                            {cv.experience?.filter(Boolean).map((exp, idx) => (
                              <div key={idx}>
                                <div className="flex items-center justify-between">
                                  <h4 className="text-lg font-semibold">
                                    {exp.role || "Role"} at{" "}
                                    {exp.company || "Company"}
                                  </h4>
                                  <span className="text-sm text-gray-500">
                                    {exp.duration || "Period"}
                                  </span>
                                </div>
                                <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-700">
                                  {exp.bullets
                                    ?.filter(Boolean)
                                    .map((bullet, bidx) => (
                                      <li key={bidx}>{bullet}</li>
                                    ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </section>
                      )}

                      {visibleSections.education &&
                        cv.education?.filter(Boolean).length > 0 && (
                          <section>
                            <h3 className="text-2xl font-bold mb-3">
                              Education
                            </h3>
                            <div className="space-y-3">
                              {cv.education.map((edu, idx) => (
                                <div key={idx}>
                                  <h4 className="font-semibold">
                                    {edu.degree || "Degree"}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {edu.school || "School"} ·{" "}
                                    {edu.year || "Year"}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}

                      {visibleSections.projects &&
                        cv.projects?.filter(Boolean).length > 0 && (
                          <section>
                            <h3 className="text-2xl font-bold mb-3">
                              Projects
                            </h3>
                            <div className="space-y-3">
                              {cv.projects.map((proj, idx) => (
                                <div key={idx}>
                                  <h4 className="font-semibold">
                                    {proj.name || "Project"}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {proj.description}
                                  </p>
                                  <ul className="mt-1 list-disc list-inside text-sm text-gray-700">
                                    {proj.bullets
                                      ?.filter(Boolean)
                                      .map((b, bi) => (
                                        <li key={bi}>{b}</li>
                                      ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}

                      {visibleSections.awards &&
                        cv.extras?.awards?.filter(Boolean).length > 0 && (
                          <section>
                            <h3 className="text-2xl font-bold mb-3">Awards</h3>
                            <ul className="space-y-1 text-sm text-gray-700">
                              {cv.extras.awards
                                .filter(Boolean)
                                .map((award, idx) => (
                                  <li key={idx}>• {award}</li>
                                ))}
                            </ul>
                          </section>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
