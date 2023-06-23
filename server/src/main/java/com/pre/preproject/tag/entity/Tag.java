package com.pre.preproject.tag.entity;

import com.pre.preproject.question.entity.QuestionTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tageId;

    private String tagName;

    private int questionNum;
    @OneToMany(mappedBy = "tag")
    private List<QuestionTag> questionTags = new ArrayList<>();

    public int getQuestionNum(){
        this.questionNum = this.questionTags.size();
        return this.questionNum;
    }
    public void addQuestionTag(QuestionTag questionTag){
        this.questionTags.add(questionTag);
        if (!questionTag.getTag().equals(this)) {
            questionTag.setTag(this);
        }
    }

}
