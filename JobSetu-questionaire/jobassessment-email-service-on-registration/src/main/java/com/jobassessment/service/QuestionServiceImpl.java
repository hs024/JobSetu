package com.jobassessment.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobassessment.dto.QuestionOptionDTO;
import com.jobassessment.model.OptionModel;
import com.jobassessment.model.QuestionModel;
import com.jobassessment.repository.OptionRepository;
import com.jobassessment.repository.QuestionRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class QuestionServiceImpl implements QuestionService{

	@Autowired
	QuestionRepository questionRepository;
	
	@Autowired
	OptionService optionService;
	
	@Autowired
	OptionRepository optionRepository;
	
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

	@SuppressWarnings("unused")
	@Override
	public QuestionOptionDTO addQuestionOption(QuestionOptionDTO dto) {
		QuestionModel questionModel=new QuestionModel();
		questionModel.setJobId(dto.getJobId());
		questionModel.setQuestion(dto.getQuestionText());
		QuestionModel saveQuestionModel=questionRepository.save(questionModel);
		if (saveQuestionModel == null) {
			throw new RuntimeException("Some Error Occur.Pls Contact Our Support Team");
		}
		dto.setQuestionId(saveQuestionModel.getId());
		
		for(OptionModel optionModel:dto.getOptions()) {
			optionModel.setQuestionId(saveQuestionModel.getId());
			OptionModel saveOptionModel=optionRepository.save(optionModel);
			optionModel.setId(saveOptionModel.getId());
		}
		return dto;
	}

	@Override
	public String deleteQuestion(int questionId) {
		Optional<QuestionModel> questionModel=questionRepository.findById(questionId);
		if (!questionModel.isPresent()) {
			throw new RuntimeException("Invalid Question Id");
		}
		QuestionModel question=questionModel.get();
		questionRepository.delete(question);
		List<OptionModel> optionModels=optionRepository.findByQuestionId(questionId);
		for(OptionModel option:optionModels) {
			optionRepository.delete(option);
		}
		return "Question Deleted Successfully";
	}
 
	
	
}
