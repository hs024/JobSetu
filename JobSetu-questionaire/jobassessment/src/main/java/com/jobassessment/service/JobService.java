package com.jobassessment.service;

import java.util.List;

import com.jobassessment.model.JobRoleModel;

public interface JobService {

	public JobRoleModel findJobRoleModel(int jobId);
	public List<JobRoleModel> findAllJobRoleModels();
}
