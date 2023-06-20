package com.pre.preproject.member.controller;

import com.pre.preproject.dto.MultiResponseDto;
import com.pre.preproject.dto.SingleResponseDto;
import com.pre.preproject.member.dto.RefreshTokenDto;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.service.MemberService;
import com.pre.preproject.member.mapper.MemberMapper;
import com.pre.preproject.member.service.RefreshTokenService;
import com.pre.preproject.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/members") //TODO 경로 바꾸기
@Slf4j
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final RefreshTokenService refreshTokenService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, RefreshTokenService refreshTokenService, MemberMapper mapper) {
        this.memberService = memberService;
        this.refreshTokenService = refreshTokenService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        Member member = mapper.memberPostToMember(requestBody);

        Member createdMember = memberService.createMember(member);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createdMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive long memberId,
            @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(memberId);

        Member member =
                memberService.updateMember(mapper.memberPatchToMember(requestBody));

        return ResponseEntity.ok(mapper.memberToMemberResponse(member));
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findVerifiedMember(memberId);
        MemberDto.Response response = mapper.memberToMemberResponse(member);
        return ResponseEntity.ok(new SingleResponseDto<>(response));
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size) {
        Page<Member> pageMembers = memberService.findMembers(page - 1, size);
        List<Member> members = pageMembers.getContent();
        return ResponseEntity.ok(new MultiResponseDto(mapper.membersToMemberResponses(members), pageMembers));
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
            @PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Refresh") @Positive String refreshtoken) {
        log.info(refreshtoken);
        refreshTokenService.deleteRefreshToken(refreshtoken);
        return new ResponseEntity(HttpStatus.OK);
    }
}