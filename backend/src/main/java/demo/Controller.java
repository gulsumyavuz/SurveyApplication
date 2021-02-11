/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package demo;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author gulsum.yavuz
 */

@RestController
@RequestMapping("/controller")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class Controller {
    
    @Autowired
    public Service service;
    
    @Autowired
    public TopicsRepository topicsRepository;
    
    @Autowired
    public SubmitRepository submitRepository;
    
    
    @GetMapping("/getTopics")
    public List<SurveyTopic> getTopics() {
        List<SurveyTopic> topics = StreamSupport
                .stream(this.topicsRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        System.out.println(topics);
        return topics;
    }
    
    @PostMapping("/postTopic")
    public SurveyTopic postTopic(@RequestBody SurveyTopic surveyTopic) {
        return this.topicsRepository.save(surveyTopic);
    }
    
    @GetMapping("/getSubmits")
    public List<SurveySubmits> getSubmits() {
        List<SurveySubmits> submits = StreamSupport
                .stream(this.submitRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        System.out.println(submits);
        return submits;
    }
    
    @PostMapping("/postSubmits")
    public SurveySubmits postSubmits(@RequestBody SurveySubmits SurveySubmit) {
        return this.submitRepository.save(SurveySubmit);
    }
    
}
