package com.pre.preproject.comment.service;

import com.pre.preproject.answer.entity.Answer;
import com.pre.preproject.answer.service.AnswerService;
import com.pre.preproject.comment.dto.CommentDto;
import com.pre.preproject.comment.entity.Comment;
import com.pre.preproject.comment.mapper.CommentMapper;
import com.pre.preproject.comment.repository.CommentRepository;
import com.pre.preproject.exception.BusinessLogicException;
import com.pre.preproject.exception.ExceptionCode;
import com.pre.preproject.member.entity.Member;
import com.pre.preproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final MemberService memberService;
    private final AnswerService answerService;
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    public Comment createComment(CommentDto.Post postDto, long memberId, long answerId) {
        Member member = memberService.findVerifiedMember(memberId);
        Answer answer = answerService.findVerifiedAnswer(answerId);

        Comment comment = commentMapper.commentPostDtoToComment(postDto);
        comment.setMember(member);
        comment.setAnswer(answer);

        commentRepository.save(comment);

        return comment;
    }

    public Comment updateComment(CommentDto.Patch patchDto, long memberId, long answerId) {
        Comment findComment = findVerifiedComment(patchDto.getCommentId());
        Member member = memberService.findVerifiedMember(memberId);
        Answer answer = answerService.findVerifiedAnswer(answerId);

        findComment.setContent(patchDto.getContent());

        commentRepository.save(findComment);

        return findComment;
    }

    public Comment selectComment(long commentId) {
        return findVerifiedComment(commentId);
    }

    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size, Sort.by("commentId").descending()));
    }

    public void deleteComment(long commentId, long memberId) {
        Comment findComment = findVerifiedComment(commentId);
        commentRepository.delete(findComment);
    }

    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }
}
