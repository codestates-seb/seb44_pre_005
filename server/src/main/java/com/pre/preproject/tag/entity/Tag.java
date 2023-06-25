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

    @OneToMany(mappedBy = "tag", fetch = FetchType.EAGER)
    @JoinColumn(name = "tag_id")
    private List<QuestionTag> questionTags = new ArrayList<>();


}