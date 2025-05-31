package com.jobassessment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobassessment.model.OptionModel;


@Repository
public interface OptionRepository extends JpaRepository<OptionModel, Integer>{
	List<OptionModel> findByQuestionId(int questionId);
}
