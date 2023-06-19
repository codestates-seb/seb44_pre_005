package com.pre.preproject.answer.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

public class AnswerDto {
    @Getter
    public static class Post {
        @Positive
        private long questionId;

        @NotBlank
        private String content;
    }

    @Getter
    public static class Patch {
        private long answerId;

        private String content;

        public void setAnswerId(long answerId) {
            this.answerId = answerId;
        }
    }

    @Getter
    public static class Response {
        private long answerId;
        private long memberId;
        private long questionId;
        private String content;

        // comment 추가 가능

        // dateCreated 추가 가능
    }
}
