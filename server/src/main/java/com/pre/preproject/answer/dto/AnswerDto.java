package com.pre.preproject.answer.dto;

import com.pre.preproject.comment.dto.CommentDto;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

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
        private LocalDateTime dateCreated;
        private LocalDateTime dateModified;
        private List<CommentDto.Response> commentList;
    }
}
