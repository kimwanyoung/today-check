package com.team.todaycheck.main.repository;

import java.util.List;

import com.team.todaycheck.main.DTO.ProfileMissionDTO;

public interface CustomProfileRepository {

	List<ProfileMissionDTO> getJoinMissionList(Long userId);
	List<ProfileMissionDTO> getCreateEntity(Long userId);
	void setUserFromContent(String prevId, String newId);
	
}
