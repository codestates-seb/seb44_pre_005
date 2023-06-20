package com.pre.preproject.comment.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    public static class Post {
        @Positive
        private long answerId;

        @NotBlank
        private String content;
    }

    @Getter
    public static class Patch {
        private long commentId;
        private String content;
    }

    @Getter
    public static class Response {
        private long commentId;
        private long memberId;
        private long answerId;
        private String Content;
        private LocalDateTime dateCreated;
    }
}
