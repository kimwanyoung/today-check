package com.team.todaycheck.main.DTO;

import java.time.LocalDateTime;

import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileMissionDTO {
	@ApiParam(value = "식별자")
    private Long id;

	@ApiParam(value = "미션 포스트 타이틀")
    private String title;
	
	@ApiParam(value = "포스트 썸네일")
    private String thumbnail;
	
	@ApiParam(value = "미션 포스트 내용")
    private String content;

	@ApiParam(value = "미션 시작 날자")
    private LocalDateTime startDate;
	
	@ApiParam(value = "미션 종료 날자")
    private LocalDateTime endDate;
}