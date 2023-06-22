package com.pre.preproject.tag.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pre.preproject.question.entity.QuestionTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long tagId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String info;

    //추가
    @Column(nullable = false)
    private int count;
    @JsonIgnore
    @OneToMany(mappedBy = "tag")
    private List<QuestionTag> questionTagList = new ArrayList<>();
//
//    @OneToMany(mappedBy = "tag")
//    private List<UserTag> userTagList = new ArrayList<>();


}