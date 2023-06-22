package com.pre.preproject.tag.service;

import com.pre.preproject.question.entity.QuestionTag;
import com.pre.preproject.tag.entity.Tag;
import com.pre.preproject.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;


    // 태그 조회
    public Page<QuestionTag> findTag(int page, int size, long tagId) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("tagId").descending());
        Tag tag = findVerifyTags(tagId);
        tag.setTagId(tagId);

        List<QuestionTag> questions = tag.getQuestionTagList()
                .stream()
                .filter(q->!q.getQuestion().getTags().contains(tagId))
                .collect(Collectors.toList());

        if(questions == null || questions.isEmpty()){
            return new PageImpl<>(new ArrayList<>(),pageable,0);
        }

        return new PageImpl<>(questions,pageable,questions.size());
    }


    // 태그전체조회
    public Page<Tag> findTags(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("tagId").descending());
        return tagRepository.findAll(pageable);
    }


    // 태그존재여부
    public Tag findVerifyTags(long tagId) {
        Optional<Tag> optionalTag = tagRepository.findById(tagId);
        Tag findTag = optionalTag.orElseThrow(()-> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
        return findTag;
    }
}