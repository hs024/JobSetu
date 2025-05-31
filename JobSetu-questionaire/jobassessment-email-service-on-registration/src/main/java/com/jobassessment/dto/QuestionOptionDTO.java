package com.jobassessment.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jobassessment.model.OptionModel;

public class QuestionOptionDTO {

	@JsonProperty("question_id")
	private int questionId;
	
	@JsonProperty("job_id")
	private int jobId;
	
	public int getJobId() {
		return jobId;
	}

	public void setJobId(int jobId) {
		this.jobId = jobId;
	}

	@JsonProperty("question_text")
	private String questionText;
	
	@JsonProperty("options")
	List<OptionModel> options=new ArrayList<>();

	public QuestionOptionDTO() {
		super();
	}

	public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public String getQuestionText() {
		return questionText;
	}

	public void setQuestionText(String questionText) {
		this.questionText = questionText;
	}

	public List<OptionModel> getOptions() {
		return options;
	}

	public void setOptions(List<OptionModel> options) {
		this.options = options;
	}

}
