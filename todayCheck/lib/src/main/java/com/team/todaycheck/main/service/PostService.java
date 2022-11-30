package com.team.todaycheck.main.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.team.todaycheck.main.DTO.PostDTO;
import com.team.todaycheck.main.entity.Post;
import com.team.todaycheck.main.entity.UserEntity;
import com.team.todaycheck.main.exception.UnknownPostException;
import com.team.todaycheck.main.repository.PostRepository;
import com.team.todaycheck.main.repository.UserRepository;

@Service
@Transactional
public class PostService {
	
	@Autowired PostRepository postRepos;
	@Autowired UserRepository userRepos;
	
	public void addPost(PostDTO post) {
		UserEntity user = userRepos.findById(post.getUserId());
		user.addpost(toEntity(post));
	}
	
	public Page<Post> getAllPost(Pageable pageable) {
		return postRepos.findAll(pageable);
	}
	
	public Post getOnePost(int postnumber) {
		return postRepos.findByPostKey(postnumber);
	}
	
	public static Post toEntity(PostDTO post) {
		return Post.builder()
				.postKey(post.getPostKey())
				.title(post.getTitle())
				.userId(post.getUserId())
				.description(post.getDescription())
				.thumbnail(post.getThumbnail())
				.build();
	}
	
	public static PostDTO fromEntity(Post post) {
		return PostDTO.builder()
				.postKey(post.getPostKey())
				.title(post.getTitle())
				.userId(post.getUserId())
				.description(post.getDescription())
				.thumbnail(post.getThumbnail())
				.date(post.getDate().toString())
				.build();
	}

	public void deletePost(String postNumber) {
		postRepos.deleteByPostKey(Integer.parseInt(postNumber));
	}

	public void modifyPost(PostDTO postData , int postNumber) {
		Post post = postRepos.findByPostKey(postNumber);
		
		if(post == null) {
			throw new UnknownPostException("알 수 없는 페이지입니다.");
		}
		post.setDescription(postData.getDescription());
		post.setThumbnail(postData.getThumbnail());
		post.setTitle(postData.getTitle());
	}
}
