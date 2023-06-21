package com.pre.preproject.comment.repository;

import com.pre.preproject.answer.entity.Answer;
import com.pre.preproject.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(value = "SELECT c FROM Comment c WHERE c.answer = :answer")
    List<Comment> findByAnswerId(Answer answer);
}
