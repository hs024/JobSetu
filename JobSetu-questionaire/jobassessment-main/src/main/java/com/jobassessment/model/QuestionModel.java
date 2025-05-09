package com.jobassessment.model;

import java.io.Serial;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tab_question_det")
public class QuestionModel implements Serializable{

    @Serial
    private static final long serialVersionUID = 986543266623421L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "question_id")
	@JsonProperty(value = "question_id")
	private int id;
	
	@Column(name = "job_id")
	@JsonProperty(value = "job_id")
	private int jobId;
	
	@Column(name = "question_value",columnDefinition="VARCHAR(200)")
	@JsonProperty(value = "question_value")
	private String question;
	
	public int getId() {
		return id;
	}

	
	
	public int getJobId() {
		return jobId;
	}



	public void setJobId(int jobId) {
		this.jobId = jobId;
	}



	public String getQuestion() {
		return question;
	}
	public void setQuestion(String question) {
		this.question = question;
	}

	public QuestionModel() {
		super();
	}

	public QuestionModel(int jobId, String question) {
		super();
		this.jobId = jobId;
		this.question = question;
	}

}
