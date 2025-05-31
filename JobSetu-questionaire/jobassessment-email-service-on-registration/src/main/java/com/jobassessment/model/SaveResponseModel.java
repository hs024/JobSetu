package com.jobassessment.model;


import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user_result_table")
public class SaveResponseModel {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
@Column(name = "result_id")
@JsonProperty(value = "result_id")
private int id;

@Column(name = "user_id")
@JsonProperty(value = "user_id")
private int userId;

@Column(name = "job_id")
@JsonProperty(value = "job_id")
private int jobId;

@Column(name = "result")
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

public int getJobId() {
	return jobId;
}

public void setJobId(int jobId) {
	this.jobId = jobId;
}

public String getResult() {
	return result;
}

public void setResult(String result) {
	this.result = result;
}


}
