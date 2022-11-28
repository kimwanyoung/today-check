package com.team.todaycheck.main.repository;

public interface CustomPostRepository {
	public void updateView(int postnumber);
	public boolean increaseRecommander(int postNumber , String userId);
}
