package com.jobassessment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobassessment.model.JobRoleModel;
import com.jobassessment.repository.JobRepository;

@Service
public class JobServiceImpl implements JobService{

	@Autowired
	JobRepository jobRepository;
	@Override
	public JobRoleModel findJobRoleModel(int jobId) {
		
		return jobRepository.findById(jobId).get();
	}

	@Override
	public List<JobRoleModel> findAllJobRoleModels() {
		return jobRepository.findAll();
	}

}
