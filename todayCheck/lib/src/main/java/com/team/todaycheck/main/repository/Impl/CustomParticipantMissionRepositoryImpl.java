package com.team.todaycheck.main.repository.Impl;

import static com.team.todaycheck.main.entity.QMission.mission;
import static com.team.todaycheck.main.entity.QParticipantsMission.participantsMission;
import static com.team.todaycheck.main.entity.QUserEntity.userEntity;
import static com.team.todaycheck.main.entity.QMissionCertification.missionCertification;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import com.querydsl.jpa.impl.JPADeleteClause;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.team.todaycheck.main.entity.Mission;
import com.team.todaycheck.main.entity.ParticipantsMission;
import com.team.todaycheck.main.repository.CustomParticipantMissionRepository;

public class CustomParticipantMissionRepositoryImpl extends QuerydslRepositorySupport implements CustomParticipantMissionRepository {
	
	private JPAQueryFactory queryFactory;
	
	public CustomParticipantMissionRepositoryImpl(JPAQueryFactory queryFactory) {
		super(Mission.class);
		this.queryFactory = queryFactory;
	}
	
	@Override
	public List<ParticipantsMission> findMission(Long keys) {
		/*
		return queryFactory.select(participantsMission).from(participantsMission).leftJoin(participantsMission.mission , mission).fetchJoin()
			.leftJoin(participantsMission.participants).fetchJoin()
			.leftJoin(participantsMission.missionCertification , missionCertification).fetchJoin()
			.where(mission.id.eq(keys)).distinct().fetch();
			*/
		return queryFactory.select(participantsMission).from(participantsMission)
				.innerJoin(participantsMission.participants).fetchJoin()
				.innerJoin(participantsMission.mission , mission).fetchJoin()
				.leftJoin(participantsMission.missionCertification , missionCertification).fetchJoin()
				.where(mission.id.eq(keys)).distinct().fetch();
	}

	@Override
	public void leaveMission(Long userId, long id) {
		JPADeleteClause delete = new JPADeleteClause(getEntityManager() , participantsMission);
		
		delete.where(participantsMission.participants.userId.eq(userId).and(participantsMission.mission.id.eq(id))).execute();
	}
	
	public ParticipantsMission findOneMission(String userId , Long missionId) {
		return queryFactory.select(participantsMission).from(participantsMission).innerJoin(participantsMission.mission , mission)
				.on(mission.id.eq(missionId)).innerJoin(participantsMission.participants , userEntity).on(userEntity.id.eq(userId)).fetchOne();
	}
	
}
