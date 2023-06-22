package com.pre.preproject.question.service;

import com.pre.preproject.answer.entity.Answer;
import com.pre.preproject.exception.BusinessLogicException;
import com.pre.preproject.exception.ExceptionCode;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.service.MemberService;
import com.pre.preproject.question.dto.QuestionDto;
import com.pre.preproject.question.entity.Question;
import com.pre.preproject.question.mapper.QuestionMapper;
import com.pre.preproject.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.pre.preproject.member.service.MemberService;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionMapper questionMapper;
    private final QuestionRepository questionRepository;
    private final MemberService memberService;

    public QuestionService(QuestionMapper questionMapper, QuestionRepository questionRepository, MemberService memberService) {
        this.questionMapper = questionMapper;
        this.questionRepository = questionRepository;
        this.memberService = memberService;
    }

    //게시글 등록
    public Question createQuestion(QuestionDto.Post postDto, Member member){
        Question question = questionMapper.postDtoToQuestion(postDto);
        question.setMember(member);
        questionRepository.save(question);
        return question;
    }

    //게시글 수정
    public Question updateQuestion(QuestionDto.Patch patchDto){
        Question question = questionMapper.patchDtoToQuestion(patchDto);
        questionRepository.save(question);
        return question;

        //작성자확인, 예외처리
    }


    //상세질문조회
    public Question selectQuestion(long questionId) {
        //runtimeException을 다른 예외처리로 변경해야함
        Question question = questionRepository.findById(questionId).orElseThrow(()->new RuntimeException());
        //뷰수 추가
        question.setView(question.getView()+1);
        questionRepository.save(question);
        return question;
    }

//    public List<Question> getAllQuestions() {
//        return questionRepository.findAll();
//    }

    public Page<Question> findquestions(int page, int size) {
        return questionRepository.findByQuestionStatus(PageRequest.of(page, size, Sort.by("questionId").descending()),"ACTIVE");
    }

    //게시글 삭제
    public void deleteQuestion(long questionId){
        Question question =
        questionRepository.findById(questionId).orElseThrow(()->new RuntimeException());
        question.setQuestionStatus(Question.QuestionStatus.INACTIVE);

        //작성자 확인, 예외처리
    }

    //회원이 존재하는지 확인
    private void verifyQuestion(Question question) {
        memberService.findVerifiedMember(question.getMember().getMemberId());
    }


    //조회수 증가
    public void increaseViews(Question question) {
        question.setView(question.getView() +1);
        questionRepository.save(question);
    }

    public Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }

    //총 질문 수 카운트
    public long getTotalQuestionCount() {
        long questionCount = questionRepository.count();
        return  questionCount;
    }

}
