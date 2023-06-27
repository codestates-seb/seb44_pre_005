package com.pre.preproject.question.mapper;

import com.pre.preproject.answer.dto.AnswerDto;
import com.pre.preproject.answer.entity.Answer;
import com.pre.preproject.comment.dto.CommentDto;
import com.pre.preproject.comment.entity.Comment;
import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.mapper.MemberMapper;
import com.pre.preproject.question.dto.QuestionDto;
import com.pre.preproject.question.entity.Question;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {MemberMapper.class})
public interface QuestionMapper {
    Question postDtoToQuestion(QuestionDto.Post postDto);
    Question patchDtoToQuestion(QuestionDto.Patch patchDto);
    default QuestionDto.Response questionToResponseDto(Question question){
        if (question == null) {
            return null;
        }

        QuestionDto.Response responseDto = new QuestionDto.Response();

        responseDto.setQuestionId(question.getQuestionId());
        responseDto.setTitle(question.getTitle());
        responseDto.setContent(question.getContent());
        responseDto.setView(question.getView());
        responseDto.setDateCreated(question.getDateCreated());
        responseDto.setDateModified(question.getDateModified());
        responseDto.setMember(memberToMemberResponse(question.getMember()));

        return responseDto;
    }

    default QuestionDto.ResponseAnswer questionToResponseAnswerDto(Question question){
        if (question == null) {
            return null;
        }

        QuestionDto.ResponseAnswer responseDto = new QuestionDto.ResponseAnswer();

        responseDto.setQuestionId(question.getQuestionId());
        responseDto.setTitle(question.getTitle());
        responseDto.setContent(question.getContent());
        responseDto.setView(question.getView());
        responseDto.setDateCreated(question.getDateCreated());
        responseDto.setDateModified(question.getDateModified());
        responseDto.setMember(memberToMemberResponse(question.getMember()));
        responseDto.setAnswers(answerListToResponseDtoList(question.getAnswers()));

        return responseDto;
    }

    MemberDto.Response memberToMemberResponse(Member member);

    default List<QuestionDto.Response> questionToResponseDto(List<Question> questions){
        if (questions == null) {
            return null;
        }

        List<QuestionDto.Response> list = new ArrayList<QuestionDto.Response>( questions.size() );
        for (Question question : questions) {
            list.add(questionToResponseDto(question));
        }

        return list;
    }

    //answer를 answerRD로 바꿔줌

    default AnswerDto.ResponseComment answerToAnswerResponseDto(Answer answer) {
        return AnswerDto.ResponseComment.builder()
                .answerId(answer.getAnswerId())
                .answerContent(answer.getContent())
                .dateCreated(answer.getDateCreated())
                .dateModified(answer.getDateModified())
                .member(memberToMemberResponse(answer.getMember()))
                .comments(getCommentsByAnswer(answer.getComments()))
                .build();
    }

    default List<AnswerDto.ResponseComment> answerListToResponseDtoList(List<Answer> answers){
        if (answers == null) {
            return null;
        }

        List<AnswerDto.ResponseComment> list = new ArrayList<AnswerDto.ResponseComment>( answers.size() );
        for (Answer answer : answers) {
            list.add(answerToAnswerResponseDto(answer));
        }

        return list;
    }

    default List<CommentDto.CommentResponseList> getCommentsByAnswer(List<Comment> comments) {
        return comments
                .stream()
                .map(comment -> CommentDto.CommentResponseList
                        .builder()
                        .commentId(comment.getCommentId())
                        .content(comment.getContent())
                        .dateCreated(comment.getDateCreated())
                        .dateModified(comment.getDateModified())
                        .member(memberToMemberResponse(comment.getMember()))
                        .build())
                .collect(Collectors.toList());
    }
}
