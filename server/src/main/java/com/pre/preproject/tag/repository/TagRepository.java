package com.pre.preproject.tag.repository;

import com.pre.preproject.question.entity.Question;
import com.pre.preproject.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag,Long>  {
}
