package com.jobassessment.model;

import java.io.Serial;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tab_option_det")
public class OptionModel implements Serializable {

    @Serial
    private static final long serialVersionUID = 1234567890987654L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "option_id")
    @JsonProperty(value = "option_id")
    private int id;

    @Column(name = "question_id")
    @JsonProperty(value = "question_id")
    private int questionId;
    
    @Column(name = "option_value", columnDefinition = "VARCHAR(200)")
    @JsonProperty(value = "option_value")
    private String optionText;

    @Column(name = "is_correct")
    @JsonProperty(value = "is_correct")
    private boolean isCorrect;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getQuestionId() {
		return questionId;
	}

	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}

	public String getOptionText() {
		return optionText;
	}

	public void setOptionText(String optionText) {
		this.optionText = optionText;
	}

	@JsonProperty(value = "is_correct")
	public boolean isCorrect() {
		return isCorrect;
	}

	@JsonProperty(value = "is_correct")
	public void setCorrect(boolean isCorrect) {
		this.isCorrect = isCorrect;
	}
    	
    
}
