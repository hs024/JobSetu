package com.jobassessment.service;

import com.jobassessment.model.EmailOnRegitration;

public interface EmailService {

	public void sendEmail(EmailOnRegitration emailOnRegitration);
}
