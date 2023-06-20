package com.pre.preproject.member.entity;

import lombok.*;
import org.aspectj.weaver.patterns.TypePatternQuestions;

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

    @Column(nullable = false)
    private String password;

    private String name;
    private LocalDate birthday;
    private String phone;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    /*
    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<>  questions = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<> answers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cas)
    */


}
