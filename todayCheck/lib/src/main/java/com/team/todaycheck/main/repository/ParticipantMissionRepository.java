package com.team.todaycheck.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team.todaycheck.main.entity.ParticipantsMission;

public interface ParticipantMissionRepository extends JpaRepository<ParticipantsMission, Long> , CustomParticipantMissionRepository {

}
