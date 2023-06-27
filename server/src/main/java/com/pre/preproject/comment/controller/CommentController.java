package com.pre.preproject.comment.controller;

import com.pre.preproject.comment.dto.CommentDto;
import com.pre.preproject.comment.entity.Comment;
import com.pre.preproject.comment.mapper.CommentMapper;
import com.pre.preproject.comment.service.CommentService;
import com.pre.preproject.dto.MultiResponseDto;
import com.pre.preproject.dto.SingleResponseDto;
import com.pre.preproject.exception.BusinessLogicException;
import com.pre.preproject.exception.ExceptionCode;
import com.pre.preproject.member.entity.RefreshToken;
import com.pre.preproject.member.repository.RefreshTokenRepository;
import com.pre.preproject.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/comments")
@Validated
@RequiredArgsConstructor
@Slf4j
public class CommentController {
    private final static String COMMENT_DEFAULT_URL = "/comments";
    private final CommentService commentService;
    private final CommentMapper commentMapper;
    private final RefreshTokenRepository refreshTokenRepository;

    @PostMapping
    public ResponseEntity postComment(@RequestHeader(name = "Refresh") String token,
                                      @Valid @RequestBody CommentDto.Post postDto) {
        Long memberId = findmemberId(token);

        Comment comment = commentService.createComment(postDto, memberId, postDto.getAnswerId());

        URI location = UriCreator.createUri(COMMENT_DEFAULT_URL, comment.getCommentId());
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Positive long commentId,
                                       @RequestHeader(name = "Refresh") String token,
                                       @Valid @RequestBody CommentDto.Patch patchDto) {
        Long memberId = findmemberId(token);
        patchDto.setCommentId(commentId);

        commentService.updateComment(patchDto, memberId, patchDto.getAnswerId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") @Positive long commentId) {
        Comment comment = commentService.selectComment(commentId);

        return new ResponseEntity<>(new SingleResponseDto<>(commentMapper.commentToCommentResponseDto(comment)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getComments(@RequestParam("page") int page,
                                      @RequestParam("size") int size) {
        Page<Comment> pageComments = commentService.findComments(page - 1, size);
        List<Comment> comments = pageComments.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(commentMapper.commentToCommentResponseDto(comments), pageComments), HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId,
                                        @RequestHeader(name = "Refresh") String token) {
        Long memberId = findmemberId(token);
        commentService.deleteComment(commentId, memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public Long findmemberId(String token) {
        Optional<RefreshToken> refresht = refreshTokenRepository.findByValue(token);
        RefreshToken findtoken = refresht.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findtoken.getMemberId();
    }
}
