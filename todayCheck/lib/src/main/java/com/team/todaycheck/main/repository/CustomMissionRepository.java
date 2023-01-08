package com.team.todaycheck.main.repository;

import java.util.List;

import com.team.todaycheck.main.entity.Mission;

public interface CustomMissionRepository {
	public List<Mission> findAllMission();

	Mission findMission(Long i);
}
