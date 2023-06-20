package com.pre.preproject.question.repository;

import com.pre.preproject.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question,Long> {
//    List<Question> findQuestionByQuestionStatus(String ACTIVE);
    @Query("SELECT q FROM QUESTION WHERE q.STATUS = 'ACTIVE'")
    List<Question> findByQuestionStatus();
}
