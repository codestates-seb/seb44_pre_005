package com.pre.preproject.question.entity;

import com.pre.preproject.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private int view;
    private QuestionStatus questionStatus;
    public Question(long questionId, String title, String content, int view, QuestionStatus questionStatus, LocalDateTime dateCreated, LocalDateTime dateModified, Member member) {
        this.questionId = questionId;
        this.title = title;
        this.content = content;
        this.view = view;
        this.questionStatus = questionStatus == null ? questionStatus.ACTIVE : questionStatus;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
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
    private LocalDateTime dateCreated;
    private LocalDateTime dateModified;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<QuestionTag> questionTags = new ArrayList<>();

}
