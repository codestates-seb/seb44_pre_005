package com.pre.preproject.member.mapper;

import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member PostDtoToEntity(MemberDto.Post postDto);

    MemberDto.Response EntityToResponseDto(Member member);
}
