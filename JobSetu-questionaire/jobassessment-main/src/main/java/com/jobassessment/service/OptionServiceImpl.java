package com.jobassessment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jobassessment.model.OptionModel;
import com.jobassessment.repository.OptionRepository;

@Service
public class OptionServiceImpl  implements OptionService{

	@Autowired
	OptionRepository optionRepository;

	@Override
	public List<OptionModel> findOptionByQuestionId(int questionId) {
		return optionRepository.findByQuestionId(questionId);
	}
	
}
