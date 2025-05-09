package com.jobassessment.service;

import java.util.List;

import com.jobassessment.dto.SaveResponseDTO;
import com.jobassessment.model.JobRoleModel;
import com.jobassessment.model.SaveResponseModel;

public interface JobService {

	public JobRoleModel findJobRoleModel(int jobId);
	public List<JobRoleModel> findAllJobRoleModels();
	public Object saveResponse(SaveResponseModel saveResponseModel);
	public List<SaveResponseDTO> getAllResponse(int userId);
	public String deleteResponse(int responseId);
}
