package com.pre.preproject.tag.mapper;

import com.pre.preproject.question.entity.QuestionTag;
import com.pre.preproject.tag.dto.TagDto;
import com.pre.preproject.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    List<TagDto.OneTagResponseDto> tagToTagResponseDto(List<QuestionTag> questionList);

    Object tagToTagResponseDtos(List<Tag> tagList);
}