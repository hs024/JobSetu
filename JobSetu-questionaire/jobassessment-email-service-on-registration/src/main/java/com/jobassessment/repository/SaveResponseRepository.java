package com.jobassessment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobassessment.model.SaveResponseModel;

@Repository
public interface SaveResponseRepository extends JpaRepository<SaveResponseModel, Integer>{
public List<SaveResponseModel> findByUserId(int userId);
}
