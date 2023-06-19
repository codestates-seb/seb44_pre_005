package com.pre.preproject.question.mapper;

import com.pre.preproject.question.dto.QuestionDto;
import com.pre.preproject.question.entity.Question;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question postDtoToQuestion(QuestionDto.Post postDto);
    Question patchDtoToQuestion(QuestionDto.Patch patchDto);
    QuestionDto.Response questionToResponseDto(Question question);
    List<QuestionDto.Response> questionToResponseDto(List<Question> questions);
}
