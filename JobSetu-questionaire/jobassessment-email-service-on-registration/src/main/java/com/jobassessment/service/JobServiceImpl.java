package com.jobassessment.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobassessment.dto.SaveResponseDTO;
import com.jobassessment.model.FeedBackModel;
import com.jobassessment.model.JobRoleModel;
import com.jobassessment.model.SaveResponseModel;
import com.jobassessment.repository.FeedbackRepository;
import com.jobassessment.repository.JobRepository;
import com.jobassessment.repository.SaveResponseRepository;

@Service
public class JobServiceImpl implements JobService{

	@Autowired
	JobRepository jobRepository;
	
	@Autowired
	SaveResponseRepository saveResponseRepository;
	
	@Autowired
	FeedbackRepository feedbackRepository;
	
	@Override
	public JobRoleModel findJobRoleModel(int jobId) {
		
		return jobRepository.findById(jobId).get();
	}

	@Override
	public List<JobRoleModel> findAllJobRoleModels() {
		return jobRepository.findAll();
	}

	@Override
	public Object saveResponse(SaveResponseModel saveResponseModel) {
		saveResponseRepository.save(saveResponseModel);
		return "SUCCESS";
	}

	@Override
	public List<SaveResponseDTO> getAllResponse(int userId) {
		List<SaveResponseModel> saveResponseModels=saveResponseRepository.findByUserId(userId);
		List<SaveResponseDTO> dtos=new ArrayList<>();
		if (saveResponseModels ==null ||saveResponseModels.isEmpty()) {
			return new ArrayList<>();
		}
		
		for(SaveResponseModel saveResponseModel:saveResponseModels) {
			SaveResponseDTO dto=new SaveResponseDTO();
			dto.setId(saveResponseModel.getId());
			String jobRole=jobRepository.findById(saveResponseModel.getJobId()).get().getJobRole();
			dto.setJobName(jobRole);
			dto.setUserId(saveResponseModel.getUserId());
			dto.setResult(saveResponseModel.getResult());
			dtos.add(dto);
		}
		return dtos;
	}

	@Override
	public String deleteResponse(int responseId) {
		Optional<SaveResponseModel> response=saveResponseRepository.findById(responseId);
		if (!response.isPresent()) {
			throw new RuntimeException("Invalid ResponseId");
		}
		saveResponseRepository.delete(response.get());
		return "Success";
	}

	@Override
	public String addFeedBack(FeedBackModel feedback) {
		feedbackRepository.save(feedback);
		return "SUCCESS";
	}

	@Override
	public List<FeedBackModel> findAllFeedBack(int userId) {
		
		return feedbackRepository.findByUserId(userId);
	}

	
}
