package com.jobassessment.dto;

import com.fasterxml.jackson.annotation.JsonProperty;


public class SaveResponseDTO {
	@JsonProperty(value = "result_id")
	private int id;

	@JsonProperty(value = "user_id")
	private int userId;

	
	@JsonProperty(value = "job_name")
	private String jobName;

	@JsonProperty(value = "result")
	private String result;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}
	
	
	
}
