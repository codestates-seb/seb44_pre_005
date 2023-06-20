package com.pre.preproject.question.controller;

import com.pre.preproject.dto.MultiResponseDto;
import com.pre.preproject.dto.SingleResponseDto;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.question.dto.QuestionDto;
import com.pre.preproject.question.entity.Question;
import com.pre.preproject.question.mapper.QuestionMapper;
import com.pre.preproject.question.service.QuestionService;
import com.pre.preproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

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
    //질문 상세 조회, 뷰 카운트
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") Long questionId){
        Question question = questionService.selectQuestion(questionId);
        questionService.increaseViews(question);
        return new ResponseEntity<>(new SingleResponseDto<>(questionMapper.questionToResponseDto(question)), HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity getQuestion(@RequestParam("page") int page,
//                                      @RequestParam("size") int size){
//        return null;
//    }

    //전체게시글 조회
    @GetMapping
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId,
                                      @RequestParam("page") int page,
                                      @RequestParam("size") int size) {
        Page<Question> pageQuestions = questionService.findquestions(- 1,size);
        List<Question> questions = questionService.getAllQuestions();
        return ResponseEntity.ok(questions);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") Long questionId){
        questionService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }



}
