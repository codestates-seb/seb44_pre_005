package com.pre.preproject.answer.mapper;

import com.pre.preproject.answer.dto.AnswerDto;
import com.pre.preproject.answer.entity.Answer;
import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.mapper.MemberMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", uses = {MemberMapper.class})
public interface AnswerMapper {
    Answer answerPostDtoToAnswer(AnswerDto.Post requestBody);

    Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody);

    default AnswerDto.Response answerToAnswerResponseDto(Answer answer) {
        if (answer == null) {
            return null;
        }

        AnswerDto.Response responseDto = new AnswerDto.Response();

        responseDto.setAnswerId(answer.getAnswerId());
        responseDto.setContent(answer.getContent());
        responseDto.setDateCreated(answer.getDateCreated());
        responseDto.setDateModified(answer.getDateModified());
        responseDto.setMember(memberToMemberResponse(answer.getMember()));

        return responseDto;
    }

    MemberDto.Response memberToMemberResponse(Member member);

    default List<AnswerDto.Response> answerToAnswerResponseDto(List<Answer> answers) {
        if (answers == null) {
            return null;
        }

        List<AnswerDto.Response> list = new ArrayList<>(answers.size());
        for (Answer answer : answers) {
            list.add(answerToAnswerResponseDto(answer));
        }

        return list;
    }
}
