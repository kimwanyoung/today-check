package com.team.todaycheck.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team.todaycheck.main.DTO.MessageDTO;
import com.team.todaycheck.main.DTO.PostDTO;
import com.team.todaycheck.main.entity.Post;
import com.team.todaycheck.main.service.PostService;

@RestController
@RequestMapping("/post")
public class PostController {

	@Autowired PostService postService;
	
	@RequestMapping(value = "/post" , method = RequestMethod.POST)
	public MessageDTO addPost(@RequestBody PostDTO postData) {
		postService.addPost(postData);
		return MessageDTO.builder()
				.code("1")
				.message("게시글이 성공적으로 게시되었습니다.")
				.build();
	}
	
	// /wholePost?page=0&size=20&sort=postKey,desc
	@RequestMapping(value = "/wholePost" , method = RequestMethod.GET)
	public Page<Post> getAllPost(Pageable pageable) {
		return postService.getAllPost(pageable);
	}
	
	@RequestMapping(value = "/onePost" , method = RequestMethod.GET)
	public Post getOnePost(@RequestParam(name = "number") String postNumber) {
		return postService.getOnePost(Integer.parseInt(postNumber));
	}
	
	@RequestMapping(value = "/post/{postNumber}" , method = RequestMethod.DELETE)
	public MessageDTO deletePost(@PathVariable(name = "postNumber") String postNumber) {
		postService.deletePost(postNumber);
		return MessageDTO.builder()
				.code("1")
				.message("게시글이 삭제되었습니다")
				.build();
	}
	
	@RequestMapping(value = "/post/{postNumber}" , method = RequestMethod.PATCH)
	public MessageDTO modifyPost(@PathVariable(name = "postNumber") String postNumber , @RequestBody PostDTO postData) {
		postService.modifyPost(postData , Integer.parseInt(postNumber));
		return MessageDTO.builder()
				.code("1")
				.message("게시글이 수정되었습니다")
				.build();
	}
}
