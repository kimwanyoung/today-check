package com.team.todaycheck.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team.todaycheck.main.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	public UserEntity findById(String id);
}
