package com.jobassessment.service;

import java.util.List;

import com.jobassessment.model.OptionModel;

public interface OptionService {
	
List<OptionModel> findOptionByQuestionId(int questionId);

}
