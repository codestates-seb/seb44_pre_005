package com.pre.preproject.question.entity;

import com.pre.preproject.tag.entity.Tag;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class QuestionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long questionTagId;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;
    public void addQuestion(Question question){
        this.question = question;
        if(!question.getQuestionTags().contains(this)){question.getQuestionTags().add(this);}
    }
    public void addTag(Tag tag){
        this.tag = tag;
        if (!tag.getQuestionTags().contains(this)) {tag.getQuestionTags().add(this);}
    }
}
