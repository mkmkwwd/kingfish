package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.*;

import com.ssafy.sub.pjt.domain.Board;
import com.ssafy.sub.pjt.domain.Comment;
import com.ssafy.sub.pjt.domain.User;
import com.ssafy.sub.pjt.domain.repository.BoardRepository;
import com.ssafy.sub.pjt.domain.repository.CommentRepository;
import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.dto.CommentRequest;
import com.ssafy.sub.pjt.dto.CommentResponse;
import com.ssafy.sub.pjt.exception.AuthException;
import com.ssafy.sub.pjt.exception.BadRequestException;
import com.ssafy.sub.pjt.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final RedisUtil redisUtil;

    @Transactional
    public CommentResponse addComment(
            CommentRequest commentRequest, Integer boardId, String socialId) {
        String content = commentRequest.getContent();
        User user = findUserBySocialId(socialId);
        Board board = findBoardById(boardId);

        Comment comment =
                Comment.builder()
                        .content(commentRequest.getContent())
                        .user(user)
                        .board(board)
                        .build();
        Comment savedComment = commentRepository.save(comment);

        final String key = "boards:*";
        redisUtil.deleteDataList(redisUtil.getKeys(key));

        return CommentResponse.of(comment, user);
    }

    @Transactional
    public void delete(String socialId, Integer boardId, Integer commentId) {
        Board board = findBoardById(boardId);
        User user = findUserBySocialId(socialId);
        Comment comment = findCommentById(commentId);

        if (board.isNotWrittenBy(user) && comment.isNotCommentedBy(user)) {
            throw new BadRequestException(CANNOT_DELETE_COMMENT_EXCEPTION);
        }

        final String key = "boards:*";
        redisUtil.deleteDataList(redisUtil.getKeys(key));

        commentRepository.delete(comment);
    }

    private User findUserBySocialId(String socialId) {
        return userRepository
                .findBySocialId(socialId)
                .orElseThrow(() -> new AuthException(NOT_FOUND_MEMBER_ID));
    }

    private Board findBoardById(Integer id) {
        return boardRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(NOT_FOUND_BOARD_ID));
    }

    public Comment findCommentById(Integer commentId) {
        return commentRepository
                .findById(commentId)
                .orElseThrow(() -> new BadRequestException(COMMENT_NOT_FOUND_EXCEPTION));
    }
}
