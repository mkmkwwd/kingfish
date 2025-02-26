package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import com.ssafy.sub.pjt.domain.Board;
import com.ssafy.sub.pjt.domain.FishBook;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = PRIVATE)
public class MyBoardResponse {

    private final Integer boardId;

    private final String imageUrl;

    private final List<String> hashTags;

    private final String fishName;

    private final String content;

    private final LocalDateTime createdAt;

    public static MyBoardResponse of(final Board board) {
        return new MyBoardResponse(
                board.getId(),
                board.getImage().getUrl(),
                board.getBoardHashTags().stream()
                        .map(boardHashTag -> boardHashTag.getHashTag().getName())
                        .collect(Collectors.toList()),
                Optional.ofNullable(board.getFishBook()).map(FishBook::getName).orElse(null),
                board.getContent(),
                board.getCreatedAt());
    }
}
