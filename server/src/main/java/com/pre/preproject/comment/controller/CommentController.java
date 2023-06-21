package com.pre.preproject.comment.controller;

import com.pre.preproject.comment.dto.CommentDto;
import com.pre.preproject.comment.entity.Comment;
import com.pre.preproject.comment.mapper.CommentMapper;
import com.pre.preproject.comment.service.CommentService;
import com.pre.preproject.dto.MultiResponseDto;
import com.pre.preproject.dto.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/questions/{question-id}/answers/{answer-id}/comments")
@Validated
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postComment(@PathVariable("question-id") @Positive long questionId,
                                      @PathVariable("answer-id") @Positive long answerId,
                                      @Valid @RequestBody CommentDto.Post requestBody) {
        Comment comment = mapper.commentPostDtoToComment(requestBody);

        commentService.createComment(comment);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.commentToCommentResponseDto(comment)),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("question-id") @Positive long questionId,
                                       @PathVariable("answer-id") @Positive long answerId,
                                       @PathVariable("comment-id") @Positive long commentId,
                                       @Valid @RequestBody CommentDto.Patch requestBody) {
        requestBody.setCommentId(commentId);

        Comment comment =
                commentService.updateComment(mapper.commentPatchDtoToComment(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.commentToCommentResponseDto(comment)),
                HttpStatus.OK);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("question-id") @Positive long questionId,
                                     @PathVariable("answer-id") @Positive long answerId,
                                     @PathVariable("comment-id") @Positive long commentId) {
        Comment comment = commentService.findComment(commentId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.commentToCommentResponseDto(comment)),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getComments(@PathVariable("question-id") @Positive long questionId,
                                      @PathVariable("answer-id") @Positive long answerId,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size) {
        Page<Comment> pageComments = commentService.findComments(page - 1, size);
        List<Comment> comments = pageComments.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.commentsToCommentResponseDtos(comments), pageComments),
                HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("question-id") @Positive long questionId,
                                        @PathVariable("answer-id") @Positive long answerId,
                                        @PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
