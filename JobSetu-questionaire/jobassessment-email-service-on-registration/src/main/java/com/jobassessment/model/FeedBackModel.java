package com.jobassessment.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tab_feedback_det")
public class FeedBackModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "feedback_id")
    @JsonProperty("id")
    private int id;

    @Column(name = "user_id")
    @JsonProperty("user_id")
    private int userId;

    @Column(name = "rating")
    @JsonProperty("rating")
    private int rating;

    @Column(name = "feedback_text", length = 1000)
    @JsonProperty("feedback_text")
    private String feedbackText;



    @JsonProperty("id")
    public int getId() {
        return id;
    }

    @JsonProperty("id")
    public void setId(int id) {
        this.id = id;
    }

    @JsonProperty("user_id")
    public int getUserId() {
        return userId;
    }

    @JsonProperty("user_id")
    public void setUserId(int userId) {
        this.userId = userId;
    }

    @JsonProperty("rating")
    public int getRating() {
        return rating;
    }

    @JsonProperty("rating")
    public void setRating(int rating) {
        this.rating = rating;
    }

    @JsonProperty("feedback_text")
    public String getFeedbackText() {
        return feedbackText;
    }

    @JsonProperty("feedback_text")
    public void setFeedbackText(String feedbackText) {
        this.feedbackText = feedbackText;
    }
}
