package com.team.todaycheck.main.DTO;

import org.springframework.http.ResponseEntity;

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
public class ParticipantDTO {
	private long id;
	private String email;
	private String name;
	private String avater;
	private ResponseEntity<byte[]> imageBase;
	private String image;
}
