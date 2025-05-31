import { useState } from "react";
import { FaStar } from "react-icons/fa"; // install with: npm install react-icons

const FeedbackSection = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to submit feedback.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/feedback/api/submit-feedback/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: feedback,
            rating: rating,
          }),
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setFeedback("");
        setRating(0);
        setHoverRating(0);
      } else {
        const data = await response.json();
        alert("Error: " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">📬 Feedback</h2>
      {submitted ? (
        <p className="text-green-400">Thanks for your feedback!</p>
      ) : (
        <form onSubmit={handleFeedbackSubmit}>
          <textarea
            className="w-full p-2 text-white rounded mb-2"
            rows="3"
            placeholder="Share your thoughts..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />

          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className={`cursor-pointer ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
            <span className="ml-2 text-sm text-gray-300">
              {rating ? `${rating} / 5` : "Rate us"}
            </span>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackSection;
