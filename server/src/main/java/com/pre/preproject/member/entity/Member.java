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
    private Long member_id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;
    @Column
    private LocalDate birthday;
    @Column
    private String phone;

    @ElementCollection(fetch = FetchType.EAGER)

    private List<String> roles = new ArrayList<>();


}
