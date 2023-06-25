package com.pre.preproject.question.controller;

import com.pre.preproject.dto.MultiResponseDto;
import com.pre.preproject.dto.SingleResponseDto;
import com.pre.preproject.exception.BusinessLogicException;
import com.pre.preproject.exception.ExceptionCode;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.entity.RefreshToken;
import com.pre.preproject.member.repository.RefreshTokenRepository;
import com.pre.preproject.question.dto.QuestionDto;
import com.pre.preproject.question.entity.Question;
import com.pre.preproject.question.mapper.QuestionMapper;
import com.pre.preproject.question.repository.QuestionRepository;
import com.pre.preproject.question.service.QuestionService;
import com.pre.preproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Validated
@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
@Slf4j
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMapper questionMapper;
    private final static String QUESTION_DEFAULT_URL = "/questions";
    private final RefreshTokenRepository refreshTokenRepository;

    @PostMapping
    public ResponseEntity postQuestion(@RequestHeader(name = "Refresh") String token,
                                       @Valid @RequestBody QuestionDto.Post postDto) {
        Long memberId = findmemberId(token);
        Question question = questionService.createQuestion(postDto, memberId);
        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, question.getQuestionId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") Long questionId,
                                        @RequestHeader(name = "Refresh") String token,
                                        @Valid @RequestBody QuestionDto.Patch patchDto){
        Long memberId = findmemberId(token);
        patchDto.setQuestionId(questionId);
        questionService.updateQuestion(patchDto, memberId);
        return new ResponseEntity<>(HttpStatus.OK);
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
                                       @RequestParam("size") int size,
                                       @RequestParam(required = false) String keyword) {
        //size 값 변경 가능
        Page<Question> pageQuestions = questionService.findquestions(page-1,size);
        List<Question> questions = pageQuestions.getContent();
        for (int i = 0; i < questions.size(); i++) {
            System.out.println(questions.get(i).toString());

        }
        return new ResponseEntity<>(new MultiResponseDto<>(questionMapper.questionToResponseDto(questions),pageQuestions),HttpStatus.OK);

    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@Positive @PathVariable("question-id") long questionId,
                                         @RequestHeader(name = "Refresh") String token){
        Long memberId = findmemberId(token);
        questionService.deleteQuestion(questionId, memberId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity getTotalQuestionCount() {
        Map<String,Long> count = new HashMap<>();
        count.put("questionCount", questionService.getTotalQuestionCount());
        return ResponseEntity.ok(count);
    }

    public Long findmemberId(String token) {
        Optional<RefreshToken> refresht = refreshTokenRepository.findByValue(token);
        RefreshToken findtoken = refresht.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findtoken.getMemberId();
    }



}
