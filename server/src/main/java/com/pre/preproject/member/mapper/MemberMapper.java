package com.pre.preproject.member.mapper;


import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member PostDtoToEntity(MemberDto.Post postDto);
    Member PatchDtoToEntity(MemberDto.Patch patchDto);
    MemberDto.Response memberToMemberResponse(Member member);
    List<MemberDto.Response> membersToMemberResponses(List<Member> members);
}
