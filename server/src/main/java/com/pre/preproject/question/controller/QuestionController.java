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
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity postQuestion(@RequestBody QuestionDto.Post postDto, Authentication authentication) {
        //멤버 확인해줘야하는데 문제가 생김
        Map<String,Object> principal = (Map) authentication.getPrincipal();
        long memberId = ((Number) principal.get("memberId")).longValue();
        System.out.println(memberId+"################################################################");
//        Member member = (Member) authentication.getPrincipal();
        QuestionDto.Response responseDto = questionMapper.questionToResponseDto(questionService.createQuestion(postDto, memberId));
        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, responseDto.getQuestionId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") Long questionId,
                                        @RequestBody QuestionDto.Patch patchDto){
        //작성자만 수정할 수 있게끔
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

    //전체게시글 조회
    @GetMapping
    public ResponseEntity getQuestions(@RequestParam("page") int page,
                                       @RequestParam("size") int size) {
        //size 값 변경 가능
        Page<Question> pageQuestions = questionService.findquestions(page-1,size);
        List<Question> questions = pageQuestions.getContent();
        return ResponseEntity.ok(questions);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") long questionId){
        //작성자 확인
        questionService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity getTotalQuestionCount() {
        Map<String,Long> count = new HashMap<>();
        count.put("questionCount", questionService.getTotalQuestionCount());
        return ResponseEntity.ok(count);
    }



}
