package com.pre.preproject.question.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@Setter
@NoArgsConstructor
public class QuestionTagDto {
    @Positive
    private long questionTagId;
    @Positive
    private long tagId;
    @Positive
    private long questionId;
}
