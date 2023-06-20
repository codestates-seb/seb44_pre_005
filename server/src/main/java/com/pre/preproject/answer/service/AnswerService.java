package com.pre.preproject.answer.service;

import com.pre.preproject.answer.entity.Answer;
import com.pre.preproject.answer.repository.AnswerRepository;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    public Answer createAnswer(Answer answer) {

        // TODO 회원 확인하기

        // TODO QuestionService 클래스에서 질문 가져오기

        return answerRepository.save(answer);
    }
}
