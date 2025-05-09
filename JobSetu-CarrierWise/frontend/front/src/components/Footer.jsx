import React, { useState } from "react";
import FeedbackSection from "./FeedbackSection";
const Footer = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // You can send this feedback to your backend or an email service
    console.log("Feedback submitted:", feedback);
    setSubmitted(true);
    setFeedback("");
  };

  return (
    <footer className="bg-gray-800 text-white p-8 mt-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Project Info */}
        <div>
          <h2 className="text-xl font-semibold mb-2">💼 JobSetu</h2>
          <p className="text-sm">
            A full-stack job discovery and assessment platform using scraping,
            smart recommendations, and skill-based evaluations.
          </p>
        </div>

        {/* Feedback Form */}
        <div><FeedbackSection /></div>

        {/* Team Credits */}
        <div>
          <h2 className="text-xl font-semibold mb-2">👥 Team</h2>
          <ul className="text-sm space-y-1">
            <li>
              💻 Himanshu – Django + React Developer (Job Assessment Platform &
              Admin site )
            </li>
            <li>🧠 Ajay – Spring Boot + React Developer (Quiz module)</li>
            <li>🧪 Anuj – Rest Framework (job portal)</li>
            <li>🗄️ Harshit – DBA & Documentation </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-6">
        © {new Date().getFullYear()} JobSetu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
