package com.pre.preproject.member.service;

import com.pre.preproject.auth.util.CustomAuthorityUtils;
import com.pre.preproject.exception.BusinessLogicException;
import com.pre.preproject.exception.ExceptionCode;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    private void verifyExistEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    private void verifyExistMember(long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public Member createMember(Member member) {
        verifyExistEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        return memberRepository.save(member);
    }

    public Member updateMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findById(member.getMember_id());
        Member fm = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Optional.ofNullable(member.getName()).ifPresent(name -> fm.setName(member.getName()));
        Optional.ofNullable(member.getPhone()).ifPresent(phone -> fm.setPhone(member.getPhone()));
        Optional.ofNullable(member.getBirthday()).ifPresent(birthday -> fm.setBirthday(member.getBirthday()));

        return memberRepository.save(fm);
    }

    public Member findMember(long member_id) {
        Optional<Member> optionalMember = memberRepository.findById(member_id);
        Member fM = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return fM;
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("member_id").descending()));
    }

    public void deleteMember(long memberId) {
        Member findMember = findMember(memberId);
        memberRepository.delete(findMember);
    }

}
