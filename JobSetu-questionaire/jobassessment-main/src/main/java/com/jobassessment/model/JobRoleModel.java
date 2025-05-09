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
@Table(name = "tab_job_role_det")
public class JobRoleModel implements Serializable{

    @Serial
    private static final long serialVersionUID = 98654324223421L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "job_id")
	@JsonProperty(value = "job_id")
	private int id;
	
	@Column(name = "job_role",columnDefinition = "VARCHAR(100)")
	@JsonProperty(value = "job_role")
	private String jobRole;

	public JobRoleModel() {
		super();
	}

	public JobRoleModel(int id, String jobRole) {
		super();
		this.id = id;
		this.jobRole = jobRole;
	}

	public JobRoleModel(String jobRole) {
		super();
		this.jobRole = jobRole;
	}

	public int getId() {
		return id;
	}

	public String getJobRole() {
		return jobRole;
	}

	public void setJobRole(String jobRole) {
		this.jobRole = jobRole;
	}
	
	
}
