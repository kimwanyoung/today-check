package com.team.todaycheck.main.DTO;

import java.util.Date;

import org.springframework.http.ResponseEntity;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MissionCertificationDTO {
	private Long keys;
	@JsonFormat(shape = JsonFormat.Shape.STRING , pattern = "yyyy-MM-dd HH:mm:ss" , timezone = "Asia/Seoul")
	private Date date;
	private ResponseEntity<byte[]> image;
	private String userName;
}
