package com.team.todaycheck.main.DTO;

import java.util.List;

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
public class ProfileDTO {
	private Long userId;
	private String id;
	private String password;
	private List<String> roles;
	private String address;
	private String phoneNumber;
	private List<ProfileMissionDTO> createMission;
	private List<ProfileMissionDTO> joinMission;
}
