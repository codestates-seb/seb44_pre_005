package com.pre.preproject.tag.controller;

import com.pre.preproject.question.entity.QuestionTag;
import com.pre.preproject.tag.dto.TagDto;
import com.pre.preproject.tag.entity.Tag;
import com.pre.preproject.tag.mapper.TagMapper;
import com.pre.preproject.tag.service.TagService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RestController
@RequestMapping("/tags")
public class TagController {
    private final TagService tagService;
    private final TagMapper tagMapper;

    public TagController(TagService tagService, TagMapper tagMapper) {
        this.tagService = tagService;
        this.tagMapper = tagMapper;
    }

    //태그 조회
    @GetMapping("/{tag-id}")
    public ResponseEntity getTag(@Positive @RequestParam("page") int page,
                                 @Positive @RequestParam("size") int size,
                                 @Positive @PathVariable("tag-id") long tagId) {

        Page<QuestionTag> questionPage = tagService.findTag(page - 1, size, tagId);
        List<QuestionTag> questionList = questionPage.getContent();

        List<TagDto.OneTagResponseDto> tagResponseDtoList = tagMapper.tagToTagResponseDto(questionList);

//        MultiResponseDto data = new MultiResponseDto(tagResponseDtoList, questionPage);
        Tag tag = tagService.findVerifyTags(tagId);
        String name = tag.getName();
        String info = tag.getInfo();

        return new ResponseEntity<>(tagResponseDtoList, HttpStatus.OK);
    }



    //태그전체조회
    @GetMapping
    public ResponseEntity getTags(@Positive @RequestParam("page") int page,
                                  @Positive @RequestParam("size") int size){
        Page<Tag> tagPage = tagService.findTags(page-1,size);
        List<Tag> tagList = tagPage.getContent();

        return new ResponseEntity<>(
                new tagReponseDto<>(tagMapper.tagToTagResponseDtos(tagList),tagPage),HttpStatus.OK);
    }


}