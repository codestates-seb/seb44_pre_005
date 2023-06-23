package com.pre.preproject.question.dto;

import com.pre.preproject.answer.dto.AnswerDto;
import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.question.entity.QuestionTag;
import lombok.AllArgsConstructor;
import lombok.Builder;
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

        private LocalDateTime dateCreated = LocalDateTime.now();
    }

    @Getter
    @Setter
    public static class Patch{
        private long questionId;
        @NotBlank(message = "제목을 입력하세요")
        private String title;
        @NotBlank(message = "내용을 입력하세요")
        private String content;
        private LocalDateTime modifiedAt = LocalDateTime.now();
    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private long questionId;
        private String title;
        private String content;
        private int view;
        private LocalDateTime dateCreated;
        private LocalDateTime dateModified;
        private MemberDto.Response member;
        private List<AnswerDto.Response> answer;
        //private List<QuestionTagDto.Response> tagList;
    }


}
