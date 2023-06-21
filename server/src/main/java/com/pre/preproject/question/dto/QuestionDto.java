package com.pre.preproject.question.dto;

import com.pre.preproject.answer.dto.AnswerDto;
import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.entity.Member;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {
    public static class Post{
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }

    public static class Patch{
        @NotBlank
        private String title;
        @NotBlank
        private String content;
    }

    @Getter
    public static class Response{
        private long questionId;
        private String title;
        private String content;
        private long view;
        private LocalDateTime date_created;
        private LocalDateTime date_modified;
        private MemberDto.Response member;
        private List<AnswerDto.Response> answerList;
    }

    @Getter
    public static class CountResponse {
        private long questionCount;
    }



}
