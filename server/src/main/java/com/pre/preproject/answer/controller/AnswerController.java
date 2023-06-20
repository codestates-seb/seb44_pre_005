package com.pre.preproject.answer.controller;

import com.pre.preproject.answer.dto.AnswerDto;
import com.pre.preproject.answer.entity.Answer;
import com.pre.preproject.answer.service.AnswerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/questions")
public class AnswerController {
    private final AnswerService answerService;

    public AnswerController(AnswerService answerService) {
        this.answerService = answerService;
    }

    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@PathVariable("question-id") long questionId,
                                     @Valid @RequestBody AnswerDto.Post requestBody) {
        return new ResponseEntity<>(requestBody, HttpStatus.CREATED);
    }
}
