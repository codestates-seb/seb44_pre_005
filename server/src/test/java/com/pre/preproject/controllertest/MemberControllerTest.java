package com.pre.preproject.controllertest;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.gson.Gson;
import com.pre.preproject.auth.jwt.JwtTokenizer;
import com.pre.preproject.member.controller.MemberController;
import com.pre.preproject.member.dto.MemberDto;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.mapper.MemberMapper;
import com.pre.preproject.member.service.MemberService;
import com.google.gson.Gson;
import com.pre.preproject.member.service.RefreshTokenService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.LocalDate;
import java.util.List;

import static com.pre.preproject.controllertest.ApiDocumentUtils.getRequestPreProcessor;
import static com.pre.preproject.controllertest.ApiDocumentUtils.getResponsePreProcessor;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MemberController.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc(addFilters = false)
@MockBean(JpaMetamodelMappingContext.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class MemberControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;
    @Autowired
    private JwtTokenizer jwtTokenizer;
    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberMapper mapper;

    @DisplayName("create member test")
    @Test
    void createMemberTest() throws Exception{
        MemberDto.Post post = new MemberDto.Post("홍길동", "hgd@gmail.com","Abc123123","010-1234-1234");

        Member member = mapper.memberPostToMember(post);
        member.setMemberId(1L);

        given(memberService.createMember(Mockito.any(Member.class)))
                .willReturn(member);

        String content = gson.toJson(post);

        ResultActions actions =
                mockMvc.perform(
                        post("/members")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(content)
                );

        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/members/"))))
                .andDo(document("post-member",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(
                                List.of(
                                        fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("phone").type(JsonFieldType.STRING).description("전화번호")
                                )
                        )
                ));

    }

    // getmembers
    @Test
    public void getMembersTest() throws Exception {
        // given
        Member member1 = new Member("hgd1@gmail.com", "홍길동1","010-1111-1111");
        Member member2 = new Member("hgd2@gmail.com", "홍길동2","010-2222-2222");

        // stubbing
        Page<Member> pageMember = new PageImpl<>(List.of(member1, member2),
                PageRequest.of(0,10, Sort.by("memberId").descending()), 2);

        List<MemberDto.Response> responses = List.of(
                new MemberDto.Response(1L, "홍길동1", "hgd1@gmail.com", "010-1111-1111"),
                new MemberDto.Response(2L, "홍길동2", "hgd2@gmail.com", "010-2222-2222"));

        given(memberService.findMembers(Mockito.anyInt(), Mockito.anyInt())).willReturn(pageMember);
        given(mapper.membersToMemberResponses(Mockito.anyList())).willReturn(responses);


        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", "1");
        queryParams.add("size", "10");
        ResultActions actions = mockMvc.perform(
                MockMvcRequestBuilders.get("/members")
                        .queryParams(queryParams)
                        .accept(MediaType.APPLICATION_JSON));

        actions.andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].email").value(member1.getEmail()))
                .andExpect(jsonPath("$.data[0].name").value(member1.getName()))
                .andExpect(jsonPath("$.data[0].phone").value(member1.getPhone()))
                .andExpect(jsonPath("$.data[1].email").value(member2.getEmail()))
                .andExpect(jsonPath("$.data[1].name").value(member2.getName()))
                .andExpect(jsonPath("$.data[1].phone").value(member2.getPhone()))
                .andDo(document("get-members",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()),
                                requestParameters(
                                        List.of(
                                                parameterWithName("page").description("page 번호"),
                                                parameterWithName("size").description("page size")
                                        )
                                ),
                                responseFields(
                                        List.of(
                                                fieldWithPath("data").type(JsonFieldType.ARRAY)
                                                        .description("결과 데이터").optional(),
                                                fieldWithPath("data[].memberId").type(JsonFieldType.NUMBER)
                                                        .description("회원 식별자"),
                                                fieldWithPath("data[].email").type(JsonFieldType.STRING)
                                                        .description("이메일"),
                                                fieldWithPath("data[].name").type(JsonFieldType.STRING)
                                                        .description("이름"),
                                                fieldWithPath("data[].phone").type(JsonFieldType.STRING)
                                                        .description("휴대폰 번호"),
                                                fieldWithPath("pageInfo").type(JsonFieldType.OBJECT)
                                                        .description("page 정보"),
                                                fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER)
                                                        .description("page 번호"),
                                                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER)
                                                        .description("page 크기"),
                                                fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER)
                                                        .description("전체 갯수"),
                                                fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER)
                                                        .description("전체 페이지 수")
                                        )
                                )
                        )
                ).andReturn();
    }


    // getmember



    // delete


    //patch

}
