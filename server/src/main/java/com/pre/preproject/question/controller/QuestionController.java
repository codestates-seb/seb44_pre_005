package com.pre.preproject.question.controller;

import com.pre.preproject.question.dto.QuestionPatchDto;
import com.pre.preproject.question.dto.QuestionPostDto;
import com.pre.preproject.question.mapper.QuestionMapper;
import com.pre.preproject.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Validated
@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {
    public final static String Question_DEAFULT_URL = "/questions";
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    @PostMapping
    public ResponseEntity postQuestion(@RequestBody QuestionPostDto questionPostDto) {
        //시큐리티 도입시 Authentication 추가
        return new ResponseEntity();
    }

    @PatchMapping("/{questionId}")
    public ResponseEntity patchQuestion(@PathVariable("questionId") Long questionId,
                                        @RequestBody QuestionPatchDto questionPatchDto){
        return new ResponseEntity();
    }

    @GetMapping("/{qestionId}")
    public ResponseEntity getQuestion(@PathVariable("questionId") Long questionId){
        return new ResponseEntity();
    }

    @GetMapping
    public ResponseEntity getQuestion(@RequestParam("page") int page,
                                      @RequestParam("size") int size){
        return null;
    }

    @DeleteMapping("/{questionId")
    public ResponseEntity deleteQuestion(@PathVariable("questionId") Long questionId){
        return new ResponseEntity();
    }



}
