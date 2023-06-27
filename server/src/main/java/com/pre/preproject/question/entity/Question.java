package com.pre.preproject.question.entity;

import com.pre.preproject.answer.entity.Answer;
import com.pre.preproject.audit.Auditable;
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

    //답변 가져오기
    @OneToMany(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Answer> answers = new ArrayList<>();
}
