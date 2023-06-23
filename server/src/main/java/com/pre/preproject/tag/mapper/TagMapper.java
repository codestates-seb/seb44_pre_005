package com.pre.preproject.tag.mapper;

import com.pre.preproject.question.dto.QuestionDto;
import com.pre.preproject.question.entity.Question;
import com.pre.preproject.tag.dto.TagDto;
import com.pre.preproject.tag.entity.Tag;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    TagDto.Response tagtoResponseDto(Tag tag);
    List<TagDto.Response> tagsToResponseDto(List<Tag> tags);
}
