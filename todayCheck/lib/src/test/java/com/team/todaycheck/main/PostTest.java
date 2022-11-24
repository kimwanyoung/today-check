package com.team.todaycheck.main;

import static org.junit.Assert.assertEquals;

import java.util.Collections;

import javax.transaction.Transactional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.test.web.servlet.MockMvc;

import com.team.todaycheck.main.DTO.MessageDTO;
import com.team.todaycheck.main.DTO.PostDTO;
import com.team.todaycheck.main.controller.PostController;
import com.team.todaycheck.main.entity.UserEntity;
import com.team.todaycheck.main.entity.UserEntity.Admin;
import com.team.todaycheck.main.repository.PostRepository;
import com.team.todaycheck.main.repository.UserRepository;
import com.team.todaycheck.main.service.LoginService;

@SpringBootTest
@AutoConfigureMockMvc
public class PostTest {

	@Autowired PostController postController;
	@Autowired LoginService loginService;
	@Autowired UserRepository userRepos;
	@Autowired PostRepository postRepos;
	@Autowired MockMvc mvc;
	
	private String testUserId = "wfa3fg51qqeRTf351wD";
	private String testUserPw = "FgG34lcp091xZCbnfaw";
	
	@Test
	@Transactional
	@DisplayName("새 Post 등록")
	public void addNewPost() {
		if(userRepos.findById(testUserId) == null) {
			UserEntity user = UserEntity.builder()
					.admin(Admin.GENERAL)
					.id(testUserId)
					.password(testUserPw)
					.roles(Collections.singletonList("ROLE_USER"))
					.build();
			
			userRepos.save(user);
		}
		
		PostDTO post = PostDTO.builder()
				.title("titleName")
				.userId(testUserId)
				.description("descData")
				.thumbnail("thumbnail")
				.postKey(Integer.MAX_VALUE)
				.build();
		
		Assertions.assertThatCode(() -> postController.addPost(post))
	    .doesNotThrowAnyException();
		// 예외가 발생하지 않았을 떄
	}
	
	@Test
	@DisplayName("Post 리스트 가져오기")
	public void getAllPost() {
		PageRequest pageRequest = PageRequest.of(1, 1, Sort.by(Sort.Direction.DESC, "postKey"));
		Assertions.assertThatCode(() -> postController.getAllPost(pageRequest)).doesNotThrowAnyException();
	}
	
	@Test
	@DisplayName("Post 수정")
	public void modifyPost() {
		/*
		PostDTO modifiedPost = PostDTO.builder()
				.title("modifyTitleName")
				.description("modifyDescriptionData")
				.thumbnail("modifiyThumbnail")
				.build();
		
		MessageDTO result = postController.modifyPost(Integer.toString(Integer.MAX_VALUE) , modifiedPost);
		assertEquals(result.getCode() , "1"); 
		 */
	}
	
	@Test
	@DisplayName("Post 삭제")
	public void deletePost() {
		MessageDTO result = postController.deletePost(Integer.toString(Integer.MAX_VALUE));
		assertEquals(result.getCode() , "1");
	}
}
