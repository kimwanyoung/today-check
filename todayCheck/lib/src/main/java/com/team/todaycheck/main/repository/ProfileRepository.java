package com.team.todaycheck.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team.todaycheck.main.entity.UserEntity;

public interface ProfileRepository extends JpaRepository<UserEntity, Long> , CustomProfileRepository {


}
