package com.jobassessment.service;

import java.util.List;

import com.jobassessment.dto.QuestionOptionDTO;
import com.jobassessment.model.QuestionModel;

public interface QuestionService {

	public List<QuestionModel> findQuestionsByJobId(int jobId);
	public List<QuestionOptionDTO> prepareQuestionOptionForJob(int jobId);
	public QuestionOptionDTO addQuestionOption(QuestionOptionDTO dto);
	public String deleteQuestion(int questionId);
}
