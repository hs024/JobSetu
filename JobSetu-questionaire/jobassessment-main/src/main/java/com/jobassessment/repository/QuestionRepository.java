package com.jobassessment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobassessment.model.QuestionModel;

@Repository
public interface QuestionRepository extends JpaRepository<QuestionModel, Integer>{
	List<QuestionModel> findByJobId(int jobId);

}
