package com.pre.preproject.comment.service;

import com.pre.preproject.answer.service.AnswerService;
import com.pre.preproject.comment.entity.Comment;
import com.pre.preproject.comment.repository.CommentRepository;
import com.pre.preproject.exception.BusinessLogicException;
import com.pre.preproject.exception.ExceptionCode;
import com.pre.preproject.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class CommentService {
    private final MemberService memberService;
    private final AnswerService answerService;
    private final CommentRepository commentRepository;

    public CommentService(MemberService memberService, AnswerService answerService, CommentRepository commentRepository) {
        this.memberService = memberService;
        this.answerService = answerService;
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        verifyComment(comment);
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getContent()).ifPresent(content -> findComment.setContent(comment.getContent()));

        return commentRepository.save(findComment);
    }

    public Comment findComment(long commentId) {
        return findVerifiedComment(commentId);
    }

    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size, Sort.by("commentId").descending()));
    }

    public void deleteComment(long commentId) {
        Comment findComment = findVerifiedComment(commentId);
        commentRepository.delete(findComment);
    }

    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }

    private void verifyComment(Comment comment) {
        memberService.findVerifiedMember(comment.getMember().getMemberId());
        answerService.findVerifiedAnswer(comment.getAnswer().getAnswerId());
    }
}
