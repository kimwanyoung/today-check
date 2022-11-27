package com.team.todaycheck.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.team.todaycheck.main.entity.Post;

public interface PostRepository extends JpaRepository<Post , Integer> , CustomPostRepository {
	public Post findByPostKey(int post_key);
	public void deleteByPostKey(int post_key);
}
