package com.team.todaycheck.main.repository.Impl;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.team.todaycheck.main.entity.Mission;
import com.team.todaycheck.main.repository.CustomMissionRepository;

import static com.team.todaycheck.main.entity.QMission.mission;

public class CustomMissionRepositoryImpl extends QuerydslRepositorySupport implements CustomMissionRepository {

private JPAQueryFactory queryFactory;
	
	public CustomMissionRepositoryImpl(JPAQueryFactory queryFactory) {
		super(Mission.class);
		this.queryFactory = queryFactory;
	}

}
