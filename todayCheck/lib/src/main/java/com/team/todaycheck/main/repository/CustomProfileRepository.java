package com.team.todaycheck.main.repository;

import java.util.List;

import com.team.todaycheck.main.DTO.ProfileMissionDTO;

public interface CustomProfileRepository {

	List<ProfileMissionDTO> getJoinMissionList(String accoundId);
	List<ProfileMissionDTO> getCreateEntity(String accoundId);
	void setUserFromContent(String prevId, String newId);
	
}
