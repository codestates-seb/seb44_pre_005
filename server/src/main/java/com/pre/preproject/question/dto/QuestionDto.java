package com.pre.preproject.question.dto;

import com.pre.preproject.answer.dto.AnswerDto;
import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDto {
    @Getter
    @Setter
    public static class Post{
        @NotBlank(message = "제목을 입력하세요")
        private String title;
        @NotBlank(message = "내용을 입력하세요")
        private String content;
    }

    @Getter
    @Setter
    public static class Patch{
        private long questionId;
        @NotBlank(message = "제목을 입력하세요")
        private String title;
        @NotBlank(message = "내용을 입력하세요")
        private String content;
    }

    @Getter
    @Setter
    public static class Response{
        private long questionId;
        private String title;
        private String content;
        private long view;
        private LocalDateTime dateCreated;
        private LocalDateTime dateModified;
        private MemberDto.Response member;
//        private List<AnswerDto.Response> answers;
    }

    @Getter
    public static class CountResponse {
        private long questionCount;
    }



}
