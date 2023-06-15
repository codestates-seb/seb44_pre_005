package com.pre.preproject.member.service;

import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    // private final CustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

}
