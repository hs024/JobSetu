package com.jobassessment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobassessment.model.JobRoleModel;

@Repository
public interface JobRepository  extends JpaRepository<JobRoleModel, Integer>{

}
