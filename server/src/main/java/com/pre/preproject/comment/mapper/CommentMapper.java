package com.pre.preproject.comment.mapper;

import com.pre.preproject.comment.dto.CommentDto;
import com.pre.preproject.comment.entity.Comment;
import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.mapper.MemberMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", uses = {MemberMapper.class})
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentDto.Post requestBody);

    Comment commentPatchDtoToComment(CommentDto.Patch requestBody);

    default CommentDto.Response commentToCommentResponseDto(Comment comment) {
        if (comment == null) {
            return null;
        }

        CommentDto.Response responseDto = new CommentDto.Response();

        responseDto.setCommentId(comment.getCommentId());
        responseDto.setContent(comment.getContent());
        responseDto.setDateCreated(comment.getDateCreated());
        responseDto.setDateModified(comment.getDateModified());
        responseDto.setMember(memberToMemberResponse(comment.getMember()));

        return responseDto;
    }

    MemberDto.Response memberToMemberResponse(Member member);

    default List<CommentDto.Response> commentToCommentResponseDto(List<Comment> comments) {
        if (comments == null) {
            return null;
        }

        List<CommentDto.Response> list = new ArrayList<>(comments.size());
        for (Comment comment : comments) {
            list.add(commentToCommentResponseDto(comment));
        }

        return list;
    }
}
