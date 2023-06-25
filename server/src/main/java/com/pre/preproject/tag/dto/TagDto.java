package com.pre.preproject.tag.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.question.dto.QuestionDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class TagDto {

    @Getter
    public static class Response {
        private long tagId;
        private String name;
    }

    @Getter
    @Setter
    public static class OneTagResponseDto {
        private long questionId;
        private String title;
        private String content;
        private LocalDateTime dateCreated;
        private LocalDateTime dateModified;
        private MemberDto.Response member;
        private List<QuestionDto.Response> questions;
    }
    //
//    @Getter
//    @Setter
//    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
//    public static class TagQuestionResponseDtos {
//        private long tagId;
//        private String name;
//    }
}