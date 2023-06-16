package com.pre.preproject.answer.mapper;

import com.pre.preproject.answer.dto.AnswerDto;
import com.pre.preproject.answer.entity.Answer;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring") // 수정 예정
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerDto.Post requestBody);
}
