package com.pre.preproject.question.dto;

import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.entity.Member;
import lombok.Getter;

import java.time.LocalDateTime;

public class QuestionDto {
    public static class Post{
        private String title;
        private String content;
    }

    public static class Patch{
        private String title;
        private String content;
    }

    @Getter
    public static class Response{
        private long question_id;
        private String title;
        private String content;
        private LocalDateTime date_created;
        private LocalDateTime date_modified;
        private MemberDto.Response member;
        //answer 추가예정
//        private List<AnswerDto.Response>
    }



}
