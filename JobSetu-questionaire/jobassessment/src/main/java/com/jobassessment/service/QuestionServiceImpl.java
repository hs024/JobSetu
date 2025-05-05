package com.jobassessment.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobassessment.dto.QuestionOptionDTO;
import com.jobassessment.model.QuestionModel;
import com.jobassessment.repository.QuestionRepository;

@Service
public class QuestionServiceImpl implements QuestionService{

	@Autowired
	QuestionRepository questionRepository;
	
	@Autowired
	OptionService optionService;
	
	@Override
	public List<QuestionModel> findQuestionsByJobId(int jobId) {
		
		return questionRepository.findByJobId(jobId);
	}
	
	@Override
	public List<QuestionOptionDTO> prepareQuestionOptionForJob(int jobId){
		List<QuestionModel> questions=findQuestionsByJobId(jobId);
		if (questions == null || questions.isEmpty()) {
			throw new RuntimeException("No Question for the job");
		}
		List<QuestionOptionDTO> questionOptionDTOs=new ArrayList<>();
		questions.forEach(question->{
			QuestionOptionDTO questionOptionDTO=new QuestionOptionDTO();
			questionOptionDTO.setQuestionId(question.getId());
			questionOptionDTO.setJobId(jobId);
			questionOptionDTO.setQuestionText(question.getQuestion());
			questionOptionDTO.setOptions(optionService.findOptionByQuestionId(question.getId()));
			questionOptionDTOs.add(questionOptionDTO);
		});
		return questionOptionDTOs;
	}
 
	
}
