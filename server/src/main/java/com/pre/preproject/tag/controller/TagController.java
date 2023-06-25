package com.pre.preproject.tag.controller;

import com.pre.preproject.dto.MultiResponseDto;
import com.pre.preproject.question.entity.Question;
import com.pre.preproject.question.mapper.QuestionMapper;
import com.pre.preproject.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Validated
@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/tags")
public class TagController {
    private final TagService tagService;
    private final QuestionMapper questionMapper;

    //태그 조회
    @GetMapping("/{tag-id}/questions")
    public ResponseEntity getQuestionByTag(@RequestParam ("page") int page,
                                           @RequestParam ("size") int size,
                                           @PathVariable ("tag-id") long tagId) {
        Page<Question> questionByTag = tagService.QuestionByTag(page -1, size, tagId);
        List<Question> questionByTagList = questionByTag.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(questionMapper.questionToResponseDto(questionByTagList),questionByTag),HttpStatus.OK);

    }



    //태그 질문수
    @GetMapping("/{tag-id}/count")
    public ResponseEntity getTotalTagQuestionCount(@PathVariable("tag-id") long tagId) {
        Map<String,Long> count = new HashMap<>();
        count.put("QuestionCount", tagService.getTagQuestionCount(tagId));
        return ResponseEntity.ok(count);
    }


    //태그 전체 조회
//    @GetMapping
//    public ResponseEntity getTags(@Positive @RequestParam("page") int page,
//                                 @Positive @RequestParam("size") int size) {
//
//        Page<QuestionTag> questionPage = tagService.(page - 1, size);
//        List<QuestionTag> questionList = questionPage.getContent();
//
//        List<TagDto.OneTagResponseDto> tagResponseDtoList = tagMapper.tagToTagResponseDto(questionList);
//
//        Tag tag = (Tag) tagService.findTag(page -1, size);
//        String name = tag.getName();
//
//        return new ResponseEntity<>(tagResponseDtoList, HttpStatus.OK);
//    }





}