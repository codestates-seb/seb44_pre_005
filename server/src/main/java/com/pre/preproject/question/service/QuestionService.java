package com.pre.preproject.question.service;

import com.pre.preproject.exception.BusinessLogicException;
import com.pre.preproject.exception.ExceptionCode;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.repository.MemberRepository;
import com.pre.preproject.member.service.MemberService;
import com.pre.preproject.question.dto.QuestionDto;
import com.pre.preproject.question.entity.Question;
import com.pre.preproject.question.mapper.QuestionMapper;
import com.pre.preproject.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionMapper questionMapper;
    private final QuestionRepository questionRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    public Question createQuestion(Question question, long memberId){
        Member member = memberService.findVerifiedMember(memberId);
        question.setMember(member);
        question.setDateCreated(LocalDateTime.now());
        question.setDateModified(LocalDateTime.now());
        question.setQuestionStatus(Question.QuestionStatus.ACTIVE);
        Question createdquestion = questionRepository.save(question);
        //  태그에 insert //
        member.addQuestion(createdquestion);
        memberRepository.save(member);
        return createdquestion;
    }
    public Question updateQuestion(Question question, long memberId){
        Question findedQuestion = findVerifiedQuestion(question.getQuestionId());
        Member member = memberService.findVerifiedMember(memberId);
        if(!findedQuestion.getMember().getMemberId().equals(member.getMemberId()) && !member.getEmail().equals("admin@gmail.com")){
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> findedQuestion.setTitle(title));
        Optional.ofNullable(question.getContent())
                .ifPresent(content -> findedQuestion.setContent(content));
        // 태그 구현 후 optional 추가
        findedQuestion.setDateModified(LocalDateTime.now());


        return questionRepository.save(findedQuestion);

    }

    //질문 전체조회 ACTIVE question 가져오기
//    public List<Question>

    //상세질문조회
    public Question selectQuestion(long questionId) {
        //runtimeException을 다른 예외처리로 변경해야함
        Question question = findVerifiedQuestion(questionId);
        //뷰수 추가
        question.setView(question.getView()+1);

        return questionRepository.save(question);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Page<Question> findquestions(int page, int size) {
        return questionRepository.findAll(PageRequest.of(page, size, Sort.by("questionId").descending()));
    }


    public void deleteQuestion(long questionId, long memberId){
        Question findquestion = findVerifiedQuestion(questionId);
        Member member = memberService.findVerifiedMember(memberId);
        if(!findquestion.getMember().getMemberId().equals(member.getMemberId()) && !member.getEmail().equals("admin@gmail.com")){
            throw new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND);
        }
        questionRepository.delete(findquestion);
    }

    //조회수 증가
    public void increaseViews(Question question) {
        question.setView(question.getView() +1);
        questionRepository.save(question);
    }
    //회원 존재하는 지 확인
    private void verifyQuestion(Question question) {
        memberService.findVerifiedMember(question.getMember().getMemberId());
    }
    public Question findVerifiedQuestion(long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        return findQuestion;
    }

}
