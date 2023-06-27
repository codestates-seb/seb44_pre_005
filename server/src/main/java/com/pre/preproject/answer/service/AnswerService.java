package com.pre.preproject.answer.service;

import com.pre.preproject.answer.dto.AnswerDto;
import com.pre.preproject.answer.entity.Answer;
import com.pre.preproject.answer.mapper.AnswerMapper;
import com.pre.preproject.answer.repository.AnswerRepository;
import com.pre.preproject.exception.BusinessLogicException;
import com.pre.preproject.exception.ExceptionCode;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.service.MemberService;
import com.pre.preproject.question.entity.Question;
import com.pre.preproject.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final MemberService memberService;
    private final QuestionService questionService;
    private final AnswerRepository answerRepository;
    private final AnswerMapper answerMapper;

    public Answer createAnswer(AnswerDto.Post postDto, long memberId, long questionId) {
        Member member = memberService.findVerifiedMember(memberId);
        Question question = questionService.findVerifiedQuestion(questionId);

        Answer answer = answerMapper.answerPostDtoToAnswer(postDto);
        answer.setMember(member);
        answer.setQuestion(question);

        answerRepository.save(answer);

        return answer;
    }

    public Answer updateAnswer(AnswerDto.Patch patchDto, long memberId, long questionId) {
        Answer findAnswer = findVerifiedAnswer(patchDto.getAnswerId());
        Member member = memberService.findVerifiedMember(memberId);
        Question question = questionService.findVerifiedQuestion(questionId);

        findAnswer.setContent(patchDto.getContent());

        answerRepository.save(findAnswer);

        return findAnswer;
    }

    public Answer selectAnswer(long answerId) {
        return findVerifiedAnswer(answerId);
    }

    public Page<Answer> findAnswers(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page, size, Sort.by("answerId").descending()));
    }

    public void deleteAnswer(long answerId, long memberId) {
        Answer findAnswer = findVerifiedAnswer(answerId);
        answerRepository.delete(findAnswer);
    }

    public Answer findVerifiedAnswer(long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }
}
