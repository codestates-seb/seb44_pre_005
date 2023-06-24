package com.pre.preproject.answer.controller;

import com.pre.preproject.answer.dto.AnswerDto;
import com.pre.preproject.answer.entity.Answer;
import com.pre.preproject.answer.mapper.AnswerMapper;
import com.pre.preproject.answer.service.AnswerService;
import com.pre.preproject.dto.MultiResponseDto;
import com.pre.preproject.dto.SingleResponseDto;
import com.pre.preproject.exception.BusinessLogicException;
import com.pre.preproject.exception.ExceptionCode;
import com.pre.preproject.member.entity.RefreshToken;
import com.pre.preproject.member.repository.RefreshTokenRepository;
import com.pre.preproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/answers")
@Validated
@RequiredArgsConstructor
@Slf4j
public class AnswerController {
    private final static String ANSWER_DEFAULT_URL = "/answers";
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;
    private final RefreshTokenRepository refreshTokenRepository;

    @PostMapping
    public ResponseEntity postAnswer(@RequestHeader(name = "Refresh") String token,
                                     @Valid @RequestBody AnswerDto.Post postDto) {
        Long memberId = findmemberId(token);

        Answer answer = answerService.createAnswer(postDto, memberId, postDto.getQuestionId());

        URI location = UriCreator.createUri(ANSWER_DEFAULT_URL, answer.getAnswerId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive long answerId,
                                      @RequestHeader(name = "Refresh") String token,
                                      @Valid @RequestBody AnswerDto.Patch patchDto) {
        Long memberId = findmemberId(token);
        patchDto.setAnswerId(answerId);

        answerService.updateAnswer(patchDto, memberId, patchDto.getQuestionId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("answer-id") @Positive long answerId) {
        Answer answer = answerService.selectAnswer(answerId);

        return new ResponseEntity<>(new SingleResponseDto<>(answerMapper.answerToAnswerResponseDto(answer)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAnswers(@RequestParam("page") int page,
                                     @RequestParam("size") int size) {
        Page<Answer> pageAnswers = answerService.findAnswers(page - 1, size);
        List<Answer> answers = pageAnswers.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(answerMapper.answerToAnswerResponseDto(answers), pageAnswers), HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive long answerId,
                                       @RequestHeader(name = "Refresh") String token) {
        Long memberId = findmemberId(token);
        answerService.deleteAnswer(answerId, memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public Long findmemberId(String token) {
        Optional<RefreshToken> refresht = refreshTokenRepository.findByValue(token);
        RefreshToken findtoken = refresht.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findtoken.getMemberId();
    }
}
