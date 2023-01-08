package com.team.todaycheck.main.repository.Impl;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.team.todaycheck.main.entity.Mission;
import com.team.todaycheck.main.repository.CustomMissionRepository;

import static com.team.todaycheck.main.entity.QMission.mission;
import static com.team.todaycheck.main.entity.QUserEntity.userEntity;
import static com.team.todaycheck.main.entity.QParticipantsMission.participantsMission;

import java.util.List;

public class CustomMissionRepositoryImpl extends QuerydslRepositorySupport implements CustomMissionRepository {

private JPAQueryFactory queryFactory;
	
	public CustomMissionRepositoryImpl(JPAQueryFactory queryFactory) {
		super(Mission.class);
		this.queryFactory = queryFactory;
	}

	@Override
	public List<Mission> findAllMission() {
		return queryFactory.select(mission).from(mission)
				.innerJoin(mission.admin , userEntity).fetchJoin()
				.leftJoin(mission.participants , participantsMission).fetchJoin()
				.distinct().fetch();
	}
	
	@Override
	public Mission findMission(Long i) {
		return queryFactory.select(mission).from(mission)
				.innerJoin(mission.admin , userEntity).fetchJoin()
				.leftJoin(mission.participants , participantsMission).fetchJoin()
				.where(mission.id.eq(i)).distinct().fetchOne();
	}

}
