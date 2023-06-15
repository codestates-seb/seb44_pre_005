package com.pre.preproject.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;


public class MemberDto {
    @Getter
    @Setter
    public static class Response{
        private Long member_id;
        private String name;
        private String email;
        private LocalDate birthday;
        private String phone;
    }

    @Getter
    @Setter
    public static class Post {
        @NotBlank(message = "공백이 아니어야 합니다.")
        @Size(min=1, max=30, message = "이름 길이는 최대 30입니다.")
        private String name;

        @NotBlank(message = "공백이 아니어야 합니다.")
        @Email(message = "이메일 형식이 올바르지 않습니다.")
        private String email;

        @NotBlank(message = "공백이 아니어야 합니다.")
        @Pattern(regexp = "^[A-Za-z\\d!@#$%^&*()_+~\\-=]{8,40}$")
        private String password;

        private String phone;
        private LocalDate birthday;
    }

    @Getter
    @Setter
    public static class Patch{
        private long memberId;
        @NotBlank(message = "공백이 아니어야 합니다.")
        @Size(min=1, max=30, message = "이름 길이는 최대 30입니다.")
        private String name;

        @NotBlank(message = "공백이 아니어야 합니다.")
        @Email(message = "이메일 형식이 올바르지 않습니다.")
        private String email;

        @NotBlank(message = "공백이 아니어야 합니다.")
        @Pattern(regexp = "^[A-Za-z\\d!@#$%^&*()_+~\\-=]{8,40}$")
        private String password;

        private String phone;
        private LocalDate birthday;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }

    /*
    @Getter
    @Setter
    public static class MypageResponse {
        private Long member_id;
        private String name;
        private LocalDate birthday;
        private String phone;
        private int questionNum;
        private int answerNum;
        private List<QuesetionDto.리스트> questionlist;
        private List<AnswerDto.리스트> answerlist;

    }

     */
}
