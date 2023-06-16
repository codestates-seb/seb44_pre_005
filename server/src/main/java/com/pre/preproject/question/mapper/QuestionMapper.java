package com.pre.preproject.question.mapper;

import com.pre.preproject.question.dto.QuestionDto;
import com.pre.preproject.question.entity.Question;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question postDtoToQuestion(QuestionDto.Post postDto);
    QuestionDto.Response questionToResponseDto(Question question);

}
