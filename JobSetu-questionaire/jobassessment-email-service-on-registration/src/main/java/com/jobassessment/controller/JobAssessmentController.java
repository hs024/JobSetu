package com.jobassessment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobassessment.dto.QuestionOptionDTO;
import com.jobassessment.dto.SaveResponseDTO;
import com.jobassessment.model.EmailOnRegitration;
import com.jobassessment.model.FeedBackModel;
import com.jobassessment.model.JobRoleModel;
import com.jobassessment.model.SaveResponseModel;
import com.jobassessment.service.EmailService;
import com.jobassessment.service.JobService;
import com.jobassessment.service.QuestionService;

@RestController
@RequestMapping("api/vi/assessment")
public class JobAssessmentController {
	
	@Autowired
	private QuestionService questionService;
	
	@Autowired
	private JobService jobService;
	
	@Autowired
	private EmailService emailService;
	
	@GetMapping("/getAllQuestions/{job_id}")
	public ResponseEntity<List<QuestionOptionDTO>> getAllQuestionByJobId(@PathVariable("job_id") int jobId){
		return ResponseEntity.ok(questionService.prepareQuestionOptionForJob(jobId));
	}
	
	@GetMapping("/getAllJobs")
	public ResponseEntity<List<JobRoleModel>> getAllJobs(){
		return ResponseEntity.ok(jobService.findAllJobRoleModels());
	}
	
	@PostMapping("/saveResponse")
	public ResponseEntity<Object> saveResponse(@RequestBody SaveResponseModel saveResponseModel){
		return ResponseEntity.status(HttpStatus.CREATED).body(jobService.saveResponse(saveResponseModel));
	}
	
	@GetMapping("/getAllResponse/{user_id}")
	public ResponseEntity<List<SaveResponseDTO>> getAllResponse(@PathVariable("user_id") int userId){
		return ResponseEntity.status(HttpStatus.OK).body(jobService.getAllResponse(userId));
	}
	
	@DeleteMapping("/deleteResponse/{response_id}")
	public ResponseEntity<String> deleteResponse(@PathVariable("response_id") int responseId) {
		return ResponseEntity.status(HttpStatus.OK).body(jobService.deleteResponse(responseId));
	}
	
	@PostMapping("/addQuestion")
	public ResponseEntity<QuestionOptionDTO> addQuestion(@RequestBody QuestionOptionDTO dto){
		
		return ResponseEntity.status(HttpStatus.CREATED).body(questionService.addQuestionOption(dto));
	}
	
	@DeleteMapping("/deleteQuestion/{question_id}")
	public ResponseEntity<String> deleteQuestion(@PathVariable("question_id") int questionId){
		return ResponseEntity.status(HttpStatus.OK).body(questionService.deleteQuestion(questionId));
	}
	
	@PostMapping("/addFeedback")
	public ResponseEntity<String> addFeedback(@RequestBody FeedBackModel feedBackModel){
		return ResponseEntity.status(HttpStatus.CREATED).body(jobService.addFeedBack(feedBackModel));
	}
	
	@GetMapping("/getAllFeedbacks/{user_id}")
	public ResponseEntity<List<FeedBackModel>> getAllFeedbacks(@PathVariable("user_id") int userId){
		return ResponseEntity.status(HttpStatus.OK).body(jobService.findAllFeedBack(userId));
	}
	

    @PostMapping("/sendRegistrationEmail")
    public String sendRegistrationEmail(@RequestBody EmailOnRegitration request) {
        emailService.sendEmail(request);
        return "Registration email sent successfully!";
    }
	
}
