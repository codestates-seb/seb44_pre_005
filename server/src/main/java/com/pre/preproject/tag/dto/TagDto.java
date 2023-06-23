package com.pre.preproject.tag.dto;

import com.pre.preproject.question.dto.QuestionDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

public class TagDto {

    @Getter
    @AllArgsConstructor
    public static class Response{
        private long tagId;
        private String tagName;
        private List<QuestionDto.Response> questions;
    }
}
