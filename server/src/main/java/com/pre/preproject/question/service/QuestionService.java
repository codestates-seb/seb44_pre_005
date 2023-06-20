package com.pre.preproject.question.service;

import com.pre.preproject.exception.BusinessLogicException;
import com.pre.preproject.exception.ExceptionCode;
import com.pre.preproject.question.dto.QuestionDto;
import com.pre.preproject.question.entity.Question;
import com.pre.preproject.question.mapper.QuestionMapper;
import com.pre.preproject.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionMapper questionMapper;
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionMapper questionMapper, QuestionRepository questionRepository) {
        this.questionMapper = questionMapper;
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(QuestionDto.Post postDto){
        Question question = questionMapper.postDtoToQuestion(postDto);
        questionRepository.save(question);
        return question;
    }
    public Question updateQuestion(QuestionDto.Patch patchDto){
        Question question = questionMapper.patchDtoToQuestion(patchDto);
        questionRepository.save(question);
        return question;

    }

    //질문 전체조회 ACTIVE question 가져오기
//    public List<Question>

    //상세질문조회
    public Question selectQuestion(long questionId) {
        //runtimeException을 다른 예외처리로 변경해야함
        Question question = questionRepository.findById(questionId).orElseThrow(()->new RuntimeException());
        //뷰수 추가
        question.setView(question.getView()+1);
        questionRepository.save(question);
        return question;
    }

    public void deleteQuestion(long questionId){
        Question question =
        questionRepository.findById(questionId).orElseThrow(()->new RuntimeException());
        question.setQuestionStatus(Question.QuestionStatus.INACTIVE);
    }

    //회원 존재하는 지 확인

    public Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }
}
