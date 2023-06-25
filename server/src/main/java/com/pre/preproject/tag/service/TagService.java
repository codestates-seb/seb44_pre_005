package com.pre.preproject.tag.service;

import com.pre.preproject.exception.BusinessLogicException;
import com.pre.preproject.exception.ExceptionCode;
import com.pre.preproject.question.entity.Question;
import com.pre.preproject.question.entity.QuestionTag;
import com.pre.preproject.question.repository.QuestionRepository;
import com.pre.preproject.tag.entity.Tag;
import com.pre.preproject.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;
    private final QuestionRepository questionRepository;


    // 태그 조회
    public Page<Question> QuestionByTag(int page, int size, long tagId) {
        Optional<Tag> optionalTag = tagRepository.findById(tagId);
        Tag tag = optionalTag.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));

        List<QuestionTag> questionTags = tag.getQuestionTags();
        List<Question> questions = new ArrayList<>();
        for (int i = 0; i < questionTags.size(); i++) {
            questions.add(questionTags.get(i).getQuestion());
        }
        PageRequest pageRequest = PageRequest.of(page, size);
        int start = (int) pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), questions.size());
        Page<Question> questionPage = new PageImpl<>(questions.subList(start, end), pageRequest, questions.size());

        return questionPage;
    }



    //태그 질문수 조회
    public long getTagQuestionCount(long tagId) {
        Optional<Tag> optionalTag = tagRepository.findById(tagId);
        Tag findTag = optionalTag.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
        long tagQuestionCount = findTag.getQuestionTags().size();
        return tagQuestionCount;
    }

//
//    // 태그전체조회
//    public Page<Tag> findTags(int page, int size) {
//        Pageable pageable = PageRequest.of(page, size, Sort.by("tagId").descending());
//        return tagRepository;
//    }


}