package com.team.todaycheck.main.service;

import java.util.List;

import com.team.todaycheck.main.DTO.MissionDTO;

public interface IMissionService {
	MissionDTO save(MissionDTO dto);
	
	List<MissionDTO> findAll();
	MissionDTO findById(long id);
}
