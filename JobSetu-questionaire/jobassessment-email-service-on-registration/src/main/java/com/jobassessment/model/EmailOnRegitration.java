package com.jobassessment.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "email_msg_det_table")
public class EmailOnRegitration {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonProperty("message_id")
	private int id;
	
	@JsonProperty("user_id")
	private int userId;
	
	@JsonProperty("user_name")
	private String userName;

	@JsonProperty("subject")
	private String subject;

	@JsonProperty("email_id")
	private String email;
	
	@JsonProperty("message_sent")
	private String Message;

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMessage() {
		return Message;
	}

	public void setMessage(String message) {
		Message = message;
	}

	public EmailOnRegitration() {
		super();
	}

}
