package com.pre.preproject.answer.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class AnswerDto {
    @Getter
    public static class Post {
        private long questionId;

        @NotBlank
        private String content;
    }

    @Getter
    public static class Patch {
        // TODO Id 추가

        private String content;
    }

    @Getter
    public static class Response {

    }
}
