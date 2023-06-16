package com.pre.preproject.question.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionPatchDto {
    private long questionId;
    private String title;
    private String content;
}
