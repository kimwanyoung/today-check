package com.team.todaycheck.main.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.team.todaycheck.main.DTO.MissionDTO;
import com.team.todaycheck.main.DTO.ParticipantDTO;
import com.team.todaycheck.main.entity.Mission;
import com.team.todaycheck.main.entity.ParticipantsMission;
import com.team.todaycheck.main.entity.UserEntity;

public interface IMissionService {
	MissionDTO save(MissionDTO dto);
	MissionDTO addParticipant(MissionDTO dto, ParticipantDTO participant);
	
	List<ParticipantsMission> findAll();
	Mission findById(Long id);
	
	List<ParticipantsMission> findMission(Long i);
	ResponseEntity leaveMission(long id, String cookie);
	ResponseEntity joinMission(long id, String cookie);
	
}
