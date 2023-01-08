package com.team.todaycheck.main.repository;

import java.util.List;

import javax.transaction.Transactional;

import com.team.todaycheck.main.entity.ParticipantsMission;

public interface CustomParticipantMissionRepository {

	List<ParticipantsMission> findMission(Long keys);
	@Transactional
	void leaveMission(Long userId, long id);
	ParticipantsMission findOneMission(String userId, Long missionId);
	
}
