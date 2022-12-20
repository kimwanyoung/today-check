package com.team.todaycheck.main.repository;

import java.util.List;

import javax.transaction.Transactional;

import com.team.todaycheck.main.entity.ParticipantsMission;

public interface CustomParticipantMissionRepository {

	List<ParticipantsMission> findMission(Long keys);
	List<ParticipantsMission> findAllMission();
	@Transactional
	void leaveMission(Long userId, long id);
	
}
