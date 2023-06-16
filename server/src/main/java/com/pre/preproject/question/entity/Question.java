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
    private Long questionId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    private LocalDateTime date_created = LocalDateTime.now();
    private LocalDateTime date_modified = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member memberId;

}
