package com.jobassessment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.jobassessment.model.EmailOnRegitration;
import com.jobassessment.repository.EmailOnRegistrationRepository;

@Service
public class EmailServiceImpl implements EmailService {

	@Autowired
	private JavaMailSender mailSender;

	@Autowired
	private EmailOnRegistrationRepository registrationRepository;

	public void sendEmail(EmailOnRegitration request) {
		SimpleMailMessage message = new SimpleMailMessage();

		message.setTo(request.getEmail());
		message.setSubject("Welcome to JobSetu–CareerWise , " + capitalizeFullName(request.getUserName()) + " !");

		String body = "Hi " + capitalizeFullName(request.getUserName()) + ",\n\n"
				+ "Thank you for registering with us! 🎉\n" + "Your registration is successful, and your User ID is: "
				+ request.getUserId() + ".\n\n"
				+ "We're excited to have you on board. You can now log in and start exploring our features and services.\n\n"
				+ "If you have any questions or need help, feel free to reply to this email.\n\n"
				+ "Welcome once again!\n\n" + "Best regards,\n" + "Team JobSetu–CareerWise\n";

		message.setText(body);
		message.setFrom("ajeyathrit@gmail.com"); // Replace with your verified sender email

		mailSender.send(message);

		// save details in db
		request.setMessage(body);
		request.setSubject(message.getSubject());
		registrationRepository.save(request);

	}

	private String capitalizeFullName(String input) {
		if (input == null || input.isEmpty()) {
			return input;
		}

		String[] words = input.trim().split("\\s+");
		StringBuilder result = new StringBuilder();

		for (String word : words) {
			if (!word.isEmpty()) {
				result.append(Character.toUpperCase(word.charAt(0))).append(word.substring(1).toLowerCase())
						.append(" ");
			}
		}

		return result.toString().trim();
	}

}
