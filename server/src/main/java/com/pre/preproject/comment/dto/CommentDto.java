package com.pre.preproject.comment.dto;

import com.pre.preproject.member.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

public class CommentDto {
    @Getter
    @Setter
    public static class Post {
        private long answerId;
        @NotBlank(message = "내용을 입력하세요")
        private String content;
    }

    @Getter
    @Setter
    public static class Patch {
        private long answerId;
        private long commentId;
        @NotBlank(message = "내용을 입력하세요")
        private String content;
    }

    @Getter
    @Setter
    public static class Response {
        private long commentId;
        private String Content;
        private LocalDateTime dateCreated;
        private LocalDateTime dateModified;
        private MemberDto.Response member;
    }
}
