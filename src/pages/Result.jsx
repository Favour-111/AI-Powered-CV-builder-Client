import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload, FaEdit, FaShare, FaHome, FaPrint } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Result = () => {
  const navigate = useNavigate();
  const [cvData, setCvData] = useState(null);
  const [template, setTemplate] = useState("modern");
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

  const getTemplateStyles = () => {
    switch (template) {
      case "corporate":
        return {
          container: "bg-white text-gray-900",
          header: "bg-gray-800 text-white",
          accent: "border-gray-300",
        };
      case "creative":
        return {
          container:
            "bg-gradient-to-br from-pink-50 to-orange-50 text-gray-900",
          header: "bg-gradient-to-r from-pink-500 to-orange-500 text-white",
          accent: "border-pink-300",
        };
      default: // modern
        return {
          container: "bg-white text-gray-900",
          header: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
          accent: "border-indigo-300",
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Your CV is Ready!
          </h1>
          <p className="text-gray-600">
            Thank you for using AI CV Builder 2026
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
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
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-2xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center gap-2"
          >
            <FaHome /> Create New CV
          </button>
        </div>

        {/* CV Preview */}
        <div className="flex justify-center mb-8">
          <div
            ref={cvRef}
            className={`w-full max-w-4xl ${styles.container} rounded-3xl shadow-2xl border border-gray-200 overflow-hidden print:shadow-none print:border-none`}
            style={{ aspectRatio: "210/297" }} // A4 ratio
          >
            <div className="p-8 h-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
                {/* Left Sidebar */}
                <div className="md:col-span-1 space-y-6">
                  {showProfileImage && profileImage && (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-2xl border-4 border-white shadow-lg mx-auto"
                    />
                  )}

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800">Contact</h3>
                    <div className="space-y-2 text-sm">
                      {cv.contact?.email && <p>📧 {cv.contact.email}</p>}
                      {cv.contact?.phone && <p>📱 {cv.contact.phone}</p>}
                      {cv.contact?.linkedin && <p>💼 {cv.contact.linkedin}</p>}
                      {cv.contact?.portfolio && (
                        <p>🌐 {cv.contact.portfolio}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-gray-800">Skills</h3>
                    <div className="space-y-2">
                      {cv.skills?.technical?.length > 0 && (
                        <div>
                          <p className="font-semibold text-sm">Technical</p>
                          <div className="flex flex-wrap gap-1">
                            {cv.skills.technical
                              .filter(Boolean)
                              .map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                      {cv.skills?.tools?.length > 0 && (
                        <div>
                          <p className="font-semibold text-sm">Tools</p>
                          <div className="flex flex-wrap gap-1">
                            {cv.skills.tools
                              .filter(Boolean)
                              .map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                      {cv.skills?.soft?.length > 0 && (
                        <div>
                          <p className="font-semibold text-sm">Soft Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {cv.skills.soft
                              .filter(Boolean)
                              .map((skill, idx) => (
                                <span
                                  key={idx}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs"
                                >
                                  {skill}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {(cv.extras?.certifications?.length > 0 ||
                    cv.extras?.awards?.length > 0 ||
                    cv.extras?.languages?.length > 0) && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-gray-800">
                        Additional
                      </h3>
                      {cv.extras?.certifications?.filter(Boolean).length >
                        0 && (
                        <div>
                          <p className="font-semibold text-sm">
                            Certifications
                          </p>
                          <ul className="text-sm space-y-1">
                            {cv.extras.certifications
                              .filter(Boolean)
                              .map((cert, idx) => (
                                <li key={idx}>• {cert}</li>
                              ))}
                          </ul>
                        </div>
                      )}
                      {cv.extras?.languages?.filter(Boolean).length > 0 && (
                        <div>
                          <p className="font-semibold text-sm">Languages</p>
                          <ul className="text-sm space-y-1">
                            {cv.extras.languages
                              .filter(Boolean)
                              .map((lang, idx) => (
                                <li key={idx}>• {lang}</li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                  <div
                    className={`${styles.header} -mx-8 -mt-8 px-8 py-6 rounded-b-3xl`}
                  >
                    <h1 className="text-3xl font-bold">
                      {cv.fullName || "Your Name"}
                    </h1>
                    <h2 className="text-xl opacity-90">
                      {cv.title || "Job Title"}
                    </h2>
                  </div>

                  {cv.summary && (
                    <section>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        Summary
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {cv.summary}
                      </p>
                    </section>
                  )}

                  {cv.experience?.length > 0 && (
                    <section>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        Experience
                      </h3>
                      <div className="space-y-4">
                        {cv.experience.map((exp, idx) => (
                          <div key={idx}>
                            <h4 className="font-semibold text-gray-800">
                              {exp.role} at {exp.company}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {exp.duration}
                            </p>
                            <ul className="space-y-1">
                              {exp.bullets
                                ?.filter(Boolean)
                                .map((bullet, bidx) => (
                                  <li
                                    key={bidx}
                                    className="text-gray-700 text-sm leading-relaxed"
                                  >
                                    • {bullet}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {cv.projects?.length > 0 && (
                    <section>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        Projects
                      </h3>
                      <div className="space-y-4">
                        {cv.projects.map((proj, idx) => (
                          <div key={idx}>
                            <h4 className="font-semibold text-gray-800">
                              {proj.name}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {proj.description}
                            </p>
                            <ul className="space-y-1">
                              {proj.bullets
                                ?.filter(Boolean)
                                .map((bullet, bidx) => (
                                  <li
                                    key={bidx}
                                    className="text-gray-700 text-sm leading-relaxed"
                                  >
                                    • {bullet}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {cv.education?.length > 0 && (
                    <section>
                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        Education
                      </h3>
                      <div className="space-y-2">
                        {cv.education.map((edu, idx) => (
                          <div key={idx}>
                            <h4 className="font-semibold text-gray-800">
                              {edu.degree}
                            </h4>
                            <p className="text-gray-700">
                              {edu.school} • {edu.year}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Need to make changes?</p>
          <button
            onClick={() => navigate("/manual")}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <FaEdit /> Edit CV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
