package com.ssafy.sub.pjt.dto;

import static lombok.AccessLevel.PRIVATE;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = PRIVATE)
public class ChatbotRequest {
    private String inputText;
}
