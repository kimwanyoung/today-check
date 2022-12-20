package com.team.todaycheck.main.repository.Impl;

import static com.team.todaycheck.main.entity.QMission.mission;
import static com.team.todaycheck.main.entity.QParticipantsMission.participantsMission;

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
		return queryFactory.select(participantsMission).from(participantsMission).leftJoin(participantsMission.mission , mission).fetchJoin()
			.leftJoin(participantsMission.participants).fetchJoin().where(mission.id.eq(keys)).fetch();
	}

	@Override
	public List<ParticipantsMission> findAllMission() {
		return queryFactory.select(participantsMission).from(participantsMission).leftJoin(participantsMission.mission , mission).fetchJoin()
				.leftJoin(participantsMission.participants).fetchJoin().fetch();
	}

	@Override
	public void leaveMission(Long userId, long id) {
		JPADeleteClause delete = new JPADeleteClause(getEntityManager() , participantsMission);
		
		delete.where(participantsMission.participants.userId.eq(userId).and(participantsMission.mission.id.eq(id))).execute();
	}
	
}
