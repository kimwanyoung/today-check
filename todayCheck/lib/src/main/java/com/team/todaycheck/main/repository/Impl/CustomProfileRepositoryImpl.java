package com.team.todaycheck.main.repository.Impl;

import static com.team.todaycheck.main.entity.QMission.mission;
import static com.team.todaycheck.main.entity.QUserEntity.userEntity;
import static com.team.todaycheck.main.entity.QPost.post;
import static com.team.todaycheck.main.entity.QComment.comment;
import static com.team.todaycheck.main.entity.QRecommander.recommander;

import java.util.List;

import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import com.team.todaycheck.main.DTO.ProfileMissionDTO;

import com.team.todaycheck.main.entity.UserEntity;
import com.team.todaycheck.main.repository.CustomProfileRepository;

public class CustomProfileRepositoryImpl extends QuerydslRepositorySupport implements CustomProfileRepository {

	private JPAQueryFactory queryFactory;
	
	public CustomProfileRepositoryImpl(JPAQueryFactory queryFactory) {
		super(UserEntity.class);
		this.queryFactory = queryFactory;
	}
	
	@Override
	public List<ProfileMissionDTO> getCreateEntity(Long userId) {
		return queryFactory.select(Projections.bean(ProfileMissionDTO.class , mission.id
				, mission.title , mission.thumbnail , mission.content , mission.startDate , mission.endDate))
				.from(mission).rightJoin(mission.admin , userEntity)
				.where(userEntity.userId.eq(userId)).fetch();
	}

	@Override
	public List<ProfileMissionDTO> getJoinMissionList(Long userId) {
		return queryFactory.select(Projections.bean(ProfileMissionDTO.class , mission.id , mission.title ,
				mission.thumbnail , mission.content , mission.startDate , mission.endDate))
				.from(mission).rightJoin(mission.participants , userEntity)
				.where(userEntity.userId.eq(userId)).fetch();
	}
	
	// recommander , post , comment 
	@Override
	public void setUserFromContent(String prevId, String newId) {
		JPAUpdateClause postUpdate = new JPAUpdateClause(getEntityManager() , post);
		JPAUpdateClause commentUpdate = new JPAUpdateClause(getEntityManager() , comment);
		JPAUpdateClause recommanderUpdate = new JPAUpdateClause(getEntityManager() , recommander);
		
		postUpdate.where(post.writer.eq(prevId)).set(post.writer, newId).execute();
		commentUpdate.where(comment.writer.eq(prevId)).set(comment.writer, newId).execute();
		recommanderUpdate.where(recommander.recommender.eq(prevId)).set(recommander.recommender, newId).execute();
	}
}
