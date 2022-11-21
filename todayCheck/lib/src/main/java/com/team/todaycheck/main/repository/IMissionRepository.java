package com.team.todaycheck.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team.todaycheck.main.entity.Mission;

public interface IMissionRepository extends JpaRepository<Mission, Long> {

}
