package com.team.todaycheck.main.repository.Impl;

// �⺻ �ν���Ʈ
import static com.team.todaycheck.main.entity.QPost.post;
import static com.team.todaycheck.main.entity.QRecommander.recommander;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPADeleteClause;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import com.team.todaycheck.main.DTO.PostDTO;
import com.team.todaycheck.main.entity.Post;
import com.team.todaycheck.main.entity.Recommander;
import com.team.todaycheck.main.repository.CustomPostRepository;

public class CustomPostRepositoryImpl extends QuerydslRepositorySupport implements CustomPostRepository {

	private JPAQueryFactory queryFactory;

	public CustomPostRepositoryImpl(JPAQueryFactory queryFactory) {
		super(Post.class);
		this.queryFactory = queryFactory;
	}

	/*
	 * ��ȸ�� 1 ������Ű�� ����
	 */
	@Override
	public void updateView(int postnumber) {
		JPAUpdateClause update = new JPAUpdateClause(getEntityManager(), post);

		update.where(post.postKey.eq(postnumber)).set(post.views , post.views.add(1)).execute();
	}

	/*
	 * ��õ�� Ȯ�� �� update 1 ����
	 */
	@Override
	public boolean increaseRecommander(int postNumber , String userId) {
		JPAUpdateClause update = new JPAUpdateClause(getEntityManager(), post);
		Recommander recommandResult = queryFactory.select(recommander).from(recommander).join(recommander.post , post).where(post.postKey.eq(postNumber).and(recommander.recommender.eq(userId))).fetchOne();
		Post postResult = queryFactory.select(post).from(post).where(post.postKey.eq(postNumber)).fetchOne();

		if(recommandResult == null) {
			postResult.addRecommander(Recommander.builder().recommender(userId).build());
			update.where(post.postKey.eq(postNumber)).set(post.recommendation , post.recommendation.add(1)).execute();
			return true;
		} else {
			return false;
		}
	}

	@Override
	public List<PostDTO> getAllPost(Pageable pageable) {
		return queryFactory.select(Projections.bean(PostDTO.class , 
				post.title , post.writer , post.description , post.thumbnail , post.date , post.postKey 
				, post.views , post.recommendation)).from(post).orderBy(postSort(pageable))
				.offset(pageable.getOffset()).limit(pageable.getPageSize()).fetch();
	}

	/**
	 * OrderSpecifier �� ������ ��ȯ�Ͽ� ���������� �����ش�.
	 * ����Ʈ ����
	 * @param page
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	private OrderSpecifier<?> postSort(Pageable page) {
		if (!page.getSort().isEmpty()) {
			for (Sort.Order order : page.getSort()) {
				Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
				switch (order.getProperty()){
					case "recommendation":
						return new OrderSpecifier(direction, post.recommendation);
					case "postKey":
						return new OrderSpecifier(direction, post.postKey);
					case "date":
						return new OrderSpecifier(direction, post.date);
					case "views":
						return new OrderSpecifier(direction, post.views);
				}
			}
		}
		return null;
	}

	@Override
	public Long deleteOnePost(int post_key, String userId) {
		JPADeleteClause delete = new JPADeleteClause(getEntityManager(), post);
		return delete.where(post.writer.eq(userId).and(post.postKey.eq(post_key))).execute();
	}

	@Override
	public Post findByPostKey(int post_key , String userId) {
		return queryFactory.select(post).from(post)
				.where(post.postKey.eq(post_key).and(post.writer.eq(userId))).fetchOne();
	}

	/*
	 * Post ��ƼƼ���� ���� ū Ű�� ��ȯ (Test ����)
	 */
	@Override
	public int getPostKeyMaxValue() {
		return queryFactory.select(post.postKey.max()).from(post).fetchOne();
	}

	@Override
	public String getImagefileName(int post_key) {
		return queryFactory.select(post.thumbnail).from(post).where(post.postKey.eq(post_key)).fetchOne();
	}
}
