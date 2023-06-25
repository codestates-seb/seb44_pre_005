package com.pre.preproject.question.mapper;

import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.mapper.MemberMapper;
import com.pre.preproject.question.dto.QuestionDto;
import com.pre.preproject.question.entity.Question;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", uses = {MemberMapper.class})
public interface QuestionMapper {
    Question postDtoToQuestion(QuestionDto.Post postDto);
    Question patchDtoToQuestion(QuestionDto.Patch patchDto);
    default QuestionDto.Response questionToResponseDto(Question question){
        if ( question == null ) {
            return null;
        }

        QuestionDto.Response responseDto = new QuestionDto.Response();

        responseDto.setQuestionId( question.getQuestionId() );
        responseDto.setTitle( question.getTitle() );
        responseDto.setContent( question.getContent() );
        responseDto.setView(question.getView());
        responseDto.setDateCreated(question.getDateCreated());
        responseDto.setDateModified(question.getDateModified());
        responseDto.setMember(memberToMemberResponse(question.getMember()));

        return responseDto;
    }

    MemberDto.Response memberToMemberResponse(Member member);

    default List<QuestionDto.Response> questionToResponseDto(List<Question> questions){
        if ( questions == null ) {
            return null;
        }

        List<QuestionDto.Response> list = new ArrayList<QuestionDto.Response>( questions.size() );
        for ( Question question : questions ) {
            list.add( questionToResponseDto( question ) );
        }

        return list;
    }
}
