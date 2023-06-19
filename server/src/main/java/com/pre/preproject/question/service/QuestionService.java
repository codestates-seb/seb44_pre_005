package com.pre.preproject.question.service;

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

    public List<Question>

    public void deleteQuestion(Long questionId){
        Question question =
        questionRepository.findById(questionId).orElseThrow(()->new RuntimeException());
        question.setQuestionStatus(Question.QuestionStatus.INACTIVE);
    }

}
