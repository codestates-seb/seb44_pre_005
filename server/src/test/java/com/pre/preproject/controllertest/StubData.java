package com.pre.preproject.controllertest;

import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpMethod;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class StubData {
    private static Map<HttpMethod, Object> stubRequestBody;
    static {
        stubRequestBody = new HashMap<>();
        stubRequestBody.put(HttpMethod.POST, new MemberDto.Post("hgd@gmail.com","홍길동",
                "010-1111-1111"));
        stubRequestBody.put(HttpMethod.PATCH, new MemberDto.Patch(0, null, "010-2222-2222", null));
    }

    public static class MockMember {
        public static Object getRequestBody(HttpMethod method) {
            return stubRequestBody.get(method);
        }

        public static Member getSingleResponseBody() {
            Member member = new Member("hgd1@gmail.com", "홍길동1", "010-1111-1111");
            return member;
        }

        public static Page<Member> getMultiResponseBody() {
            Member member1 = new Member("hgd1@gmail.com", "홍길동1", "010-1111-1111");

            Member member2 = new Member("hgd2@gmail.com", "홍길동2", "010-2222-2222");

            return new PageImpl<>(List.of(member1, member2),
                    PageRequest.of(0, 10, Sort.by("memberId").descending()),
                    2);
        }

        public static Member getSingleResponseBody(long memberId) {
            Member member = new Member("hgd@gmail.com", "홍길동", "010-1111-1111");
            member.setMemberId(memberId);
            return member;
        }

        public static Member getSingleResponseBody(long memberId, Map<String, String> updatedInfo) {
            String name = Optional.ofNullable(updatedInfo.get("name")).orElse("홍길동");
            String phone = Optional.ofNullable(updatedInfo.get("phone")).orElse("010-1111-1111");
            Member member = new Member("hgd@gmail.com", name, phone);
            member.setMemberId(memberId);
            return member;
        }
    }


}