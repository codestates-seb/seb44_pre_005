package com.pre.preproject.question.entity;

import com.pre.preproject.answer.entity.Answer;
import com.pre.preproject.audit.Auditable;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.tag.entity.Tag;
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
public class Question extends Auditable {
    @Id
    @GeneratedValue
    private long questionId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String content;
    @Column
    private long view = 0L;
    @Enumerated(EnumType.STRING)
    private QuestionStatus questionStatus;
    public Question(long questionId, String title, String content, long view, QuestionStatus questionStatus, Member member) {
        this.questionId = questionId;
        this.title = title;
        this.content = content;
        this.view = view;
        this.questionStatus = questionStatus == null ? questionStatus.ACTIVE : questionStatus;
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


    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany
    //(mappedBy = "question", fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private List<QuestionTag> questionTags = new ArrayList<>();

//    @OneToMany(mappedBy = "tag", fetch = FetchType.LAZY)
//    private List<Tag> tags = new ArrayList<>();

}
