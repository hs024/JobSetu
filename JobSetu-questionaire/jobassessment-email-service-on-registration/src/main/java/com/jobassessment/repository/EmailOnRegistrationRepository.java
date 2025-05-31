package com.jobassessment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobassessment.model.EmailOnRegitration;

@Repository
public interface EmailOnRegistrationRepository extends JpaRepository<EmailOnRegitration, Integer> {

}
