package com.pre.preproject.question.entity;

import com.pre.preproject.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Question {
    @Id
    @GeneratedValue
    private Long question_id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    private long view;
//    private long like;

    //auditable 상속받을 시 제거
    private LocalDateTime date_created = LocalDateTime.now();
    private LocalDateTime date_modified = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
