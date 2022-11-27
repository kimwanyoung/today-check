package com.team.todaycheck.main.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostDTO {
	private String title;
	private String userId;
	private String description;
	private String thumbnail;
	private String date;
	private int postKey;
	private int views;
	private int recommendation;
	@Override
	public String toString() {
		return "PostDTO [title=" + title + ", userId=" + userId + ", description=" + description + ", thumbnail="
				+ thumbnail + ", date=" + date + ", postKey=" + postKey + "]";
	}
	
}
