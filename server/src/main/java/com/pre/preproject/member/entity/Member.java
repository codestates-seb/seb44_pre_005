package com.pre.preproject.member.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.pre.preproject.answer.entity.Answer;
import com.pre.preproject.comment.entity.Comment;
import com.pre.preproject.question.entity.Question;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Member")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String email;

    private String password;

    private String name;

    private LocalDate birthday;
    private String phone;

    public Member(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();


    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Question>  questions = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Answer> answers = new ArrayList<>();


    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();



}
