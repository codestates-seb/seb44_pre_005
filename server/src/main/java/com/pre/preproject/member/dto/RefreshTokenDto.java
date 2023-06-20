package com.pre.preproject.member.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class RefreshTokenDto {
    @NotEmpty
    String refreshToken;
}