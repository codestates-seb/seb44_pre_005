package com.pre.preproject.question.controller;

import com.pre.preproject.question.dto.QuestionDto;
import com.pre.preproject.question.entity.Question;
import com.pre.preproject.question.mapper.QuestionMapper;
import com.pre.preproject.question.service.QuestionService;
import com.pre.preproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@Validated
@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    private final static String QUESTION_DEFAULT_URL = "/questions";

    public QuestionController(QuestionService questionService, QuestionMapper questionMapper) {
        this.questionService = questionService;
        this.questionMapper = questionMapper;
    }

    @PostMapping
    public ResponseEntity postQuestion(@RequestBody QuestionDto.Post postDto) {
        QuestionDto.Response responseDto = questionMapper.questionToResponseDto(questionService.createQuestion(postDto));
        //시큐리티 도입시 Authentication 추가
        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, responseDto.getQuestionId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") Long questionId,
                                        @RequestBody QuestionDto.Patch patchDto){
        QuestionDto.Response responseDto = questionMapper.questionToResponseDto(questionService.updateQuestion(patchDto));
        return ResponseEntity.ok().build();
    }
    //미완 수정예정
//    @GetMapping("/{question-id}")
//    public ResponseEntity getQuestion(@PathVariable("question-id") Long questionId){
//        return new ResponseEntity();
//    }

    @GetMapping
    public ResponseEntity getQuestion(@RequestParam("page") int page,
                                      @RequestParam("size") int size){
        return null;
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") Long questionId){
        questionService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }



}
