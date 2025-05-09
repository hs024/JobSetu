import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../TestScreen.css';  // Import TestScreen-specific CSS

const TestScreen = () => {
  const { jobId } = useParams();  // Fetch jobId from URL params
  const [questions, setQuestions] = useState([]);  // Store questions from API
  const [answers, setAnswers] = useState({});  // Store user's answers
  const navigate = useNavigate();  // Navigate to other pages after submitting

  // Fetch questions from the API
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/vi/assessment/getAllQuestions/${jobId}`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  // Fetch questions when jobId changes
  useEffect(() => {
    fetchQuestions();
  }, [jobId]);

  // Handle option selection for each question
  const handleOptionChange = (questionId, optionId) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionId,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let correctCount = 0;

    // Calculate score
    questions.forEach((question) => {
      const selectedOption = answers[question.question_id];
      if (selectedOption) {
        const selectedOptionDetails = question.options.find(option => option.option_id === selectedOption);
        if (selectedOptionDetails?.is_correct) {
          correctCount++;
        }
      }
    });

    const totalQuestions = questions.length;
    const scorePercentage = (correctCount / totalQuestions) * 100;

    // Navigate to result screen and pass score as state
    // navigate('/result', { state: { score: scorePercentage } });
    navigate("/result", {
      state: {
        score: scorePercentage,
        answers,
        jobId,
      },
    });
  };

  return (
    <div className="test-screen-container">
      <h1>MOCK TEST</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.question_id} className="question-container">
            <p>{question.question_text}</p>
            {question.options.map((option) => (
              <div key={option.option_id} className="option-container">
                <label>
                  <input
                    type="radio"
                    name={`question_${question.question_id}`}
                    value={option.option_id}
                    checked={answers[question.question_id] === option.option_id}
                    onChange={() => handleOptionChange(question.question_id, option.option_id)}
                  />
                  {option.option_value}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default TestScreen;
