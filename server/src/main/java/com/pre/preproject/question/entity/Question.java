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
    private long questionId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    private long view;
    private QuestionStatus questionStatus;
    public Question(long questionId, String title, String content, long view, QuestionStatus questionStatus, LocalDateTime date_created, LocalDateTime date_modified, Member member) {
        this.questionId = questionId;
        this.title = title;
        this.content = content;
        this.view = view;
        this.questionStatus = questionStatus == null ? questionStatus.ACTIVE : questionStatus;
        this.date_created = date_created;
        this.date_modified = date_modified;
        this.member = member;
    }

    public enum QuestionStatus {
        INACTIVE(0,"비활성"),
        ACTIVE(1,"활성");

        int statusNumber;
        String questionDescription;
        public String getQuestionDescription() {
            return questionDescription;
        }
        QuestionStatus(int statusNumber, String questionDescription) {
            this.statusNumber = statusNumber;
            this.questionDescription = questionDescription;
        }

    }
//    private long like;

    //auditable 상속받을 시 제거
    private LocalDateTime date_created = LocalDateTime.now();
    private LocalDateTime date_modified = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "member-id")
    private Member member;

}
