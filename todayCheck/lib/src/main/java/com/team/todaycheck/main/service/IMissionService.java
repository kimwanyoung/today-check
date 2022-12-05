package com.team.todaycheck.main.service;

import java.util.List;

import com.team.todaycheck.main.DTO.MissionDTO;
import com.team.todaycheck.main.DTO.ParticipantDTO;

public interface IMissionService {
	MissionDTO save(MissionDTO dto);
	MissionDTO addParticipant(MissionDTO dto, ParticipantDTO participant);
	
	List<MissionDTO> findAll();
	MissionDTO findById(long id);
}
