package com.team.todaycheck.main.DTO;

import java.util.List;

import com.team.todaycheck.main.entity.Mission;
import com.team.todaycheck.main.entity.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParticipantsMissionDTO {

	private Long keys;
	private Mission mission;
	private UserEntity participants;
	private List<MissionCertificationDTO> missionCertification;
}
