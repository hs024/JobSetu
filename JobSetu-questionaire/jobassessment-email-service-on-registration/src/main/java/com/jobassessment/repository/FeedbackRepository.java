package com.jobassessment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobassessment.model.FeedBackModel;

@Repository
public interface FeedbackRepository extends JpaRepository<FeedBackModel, Integer>{

	public List<FeedBackModel> findByUserId(int userId);;
	
}
