package com.jobassessment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobassessment.dto.QuestionOptionDTO;
import com.jobassessment.model.JobRoleModel;
import com.jobassessment.repository.JobRepository;
import com.jobassessment.repository.OptionRepository;
import com.jobassessment.repository.QuestionRepository;
import com.jobassessment.service.JobService;
import com.jobassessment.service.QuestionService;

@RestController
@RequestMapping("api/vi/assessment")
public class JobAssessmentController {
	@Autowired
	OptionRepository optionRepository;
	@Autowired
	QuestionRepository questionRepository;
	@Autowired
	JobRepository jobRepository;
	
	@Autowired
	QuestionService questionService;
	
	@Autowired
	JobService jobService;
	
	@PostMapping("/add")
	public String addAssessment() {
		JobRoleModel job=new JobRoleModel();
		job.setJobRole("DATA SCIENCE");
		JobRoleModel job2=jobRepository.save(job);
//		
//		System.out.println(job2.getId());
//		QuestionModel question1=new QuestionModel();
//		question1.setJobId(job2.getId());
//		question1.setQuestion("What is your name?");
//
//		QuestionModel questionModel=questionRepository.save(question1);
//		OptionModel option=new OptionModel();
//		option.setOptionText("First One");
//		option.setCorrect(false);
//		option.setQuestion(questionModel.getId());
//		
//		optionRepository.save(option);
		return "Done";
		
	}
	
	@GetMapping("/getAllQuestions/{job_id}")
	public ResponseEntity<List<QuestionOptionDTO>> getAllQuestionByJobId(@PathVariable("job_id") int jobId){
		return ResponseEntity.ok(questionService.prepareQuestionOptionForJob(jobId));
	}
	
	@GetMapping("/getAllJobs")
	public ResponseEntity<List<JobRoleModel>> getAllJobs(){
		return ResponseEntity.ok(jobService.findAllJobRoleModels());
	}
	
}
