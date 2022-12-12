package com.team.todaycheck.main.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.team.todaycheck.main.DTO.CommentDTO;
import com.team.todaycheck.main.DTO.MessageDTO;
import com.team.todaycheck.main.DTO.PostDTO;
import com.team.todaycheck.main.service.PostService;

@RestController
@CrossOrigin(origins = "*" , allowedHeaders = "*")
@RequestMapping("/post")
public class PostController {

	@Autowired PostService postService;
	
	// 만약 415 Unsupported MediaType ERROR 에러를 만난다면 적절한 MediaType 을 설정했는지 확인
	/*
	 * 요청 방식 :
	 * form-data 형식
	 * 1 . JSON 데이터 요청
	 * key : request 
	 * Content-type : application/json 
	 * value : # JSON 값 #
	 * 2 . ImageFile 요청
	 * key : image
	 * Content-type : image/jpeg , image/png ... 클라이언트에서 확장자에 맞게 설정
	 * value : # image #
	 */
	@RequestMapping(value = "/post" , method = RequestMethod.POST , consumes = {MediaType.APPLICATION_JSON_VALUE , MediaType.MULTIPART_FORM_DATA_VALUE})
	public MessageDTO addPost(@RequestPart(value="request") PostDTO postData , @RequestPart(value="image") MultipartFile imgFile 
			, HttpServletRequest request) throws IllegalStateException, IOException {
		
		String header = request.getHeader("Authorization");
		int number = postService.addPost(postData , imgFile , header);
		return MessageDTO.builder()
				.code("1")
				.message(Integer.toString(number))
				.build();
	}
	
	// 단일 이미지 전송
	@RequestMapping(value = "/getImageData/{postNumber}" , method = RequestMethod.GET)
	public ResponseEntity<byte[]> getImageData(@PathVariable("postNumber") String postNumber) throws FileNotFoundException {
		ResponseEntity<byte[]> result = null;
		File imageFile = postService.getImageData(postNumber);
		HttpHeaders header = new HttpHeaders();
		
		try {
			header.add("Content-Type" , Files.probeContentType(imageFile.toPath()));
			result = new ResponseEntity<byte[]>(FileCopyUtils.copyToByteArray(imageFile) , header , HttpStatus.OK);
		} catch (IOException e) {
			throw new FileNotFoundException("이미지 파일을 찾지 못했습니다.");
		}
		return result;
	}
	
	// /wholePost?page=0&size=20&sort=postKey,desc
	@RequestMapping(value = "/wholePost" , method = RequestMethod.GET)
	public List<PostDTO> getAllPost(Pageable pageable) {
		return postService.getAllPost(pageable);
	}
	
	@RequestMapping(value = "/onePost" , method = RequestMethod.GET)
	public PostDTO getOnePost(@RequestParam(name = "number") String postNumber) {
		return postService.getOnePost(Integer.parseInt(postNumber));
	}
	
	@RequestMapping(value = "/post/{postNumber}" , method = RequestMethod.DELETE)
	public MessageDTO deletePost(@PathVariable(name = "postNumber") String postNumber , HttpServletRequest request) {
		String header = request.getHeader("Authorization");
		postService.deletePost(postNumber , header);
		
		return MessageDTO.builder()
				.code("1")
				.message("게시글이 삭제되었습니다")
				.build();
	}
	
	@RequestMapping(value = "/post/{postNumber}" , method = RequestMethod.PATCH)
	public MessageDTO modifyPost(@PathVariable(name = "postNumber") String postNumber , @RequestBody PostDTO postData , HttpServletRequest request) {
		String header = request.getHeader("Authorization");
		postService.modifyPost(postData , Integer.parseInt(postNumber) , header);
		
		return MessageDTO.builder()
				.code("1")
				.message("게시글이 수정되었습니다")
				.build();
	}
	
	@RequestMapping(value = "/post/recommendation/{postNumber}" , method = RequestMethod.PATCH)
	public MessageDTO increaseRecommendation(@PathVariable(name = "postNumber") String postNumber , HttpServletRequest request) {
		String header = request.getHeader("Authorization");
		
		if(postService.increaseRecommendation(postNumber , header)) {
			return MessageDTO.builder()
					.code("1")
					.message("해당 게시물을 추천했습니다.")
					.build();
		} else {
			return MessageDTO.builder()
					.code("1")
					.message("이미 추천한 게시물입니다.")
					.build();			
		}
	}
	
	@RequestMapping(value = "/comment/{postNumber}" , method = RequestMethod.POST)
	public MessageDTO addCommentData(@PathVariable(name = "postNumber") String postNumber , 
			HttpServletRequest request , @RequestBody CommentDTO CommentDTO) {
		String header = request.getHeader("Authorization");
		
		postService.addComment(postNumber , CommentDTO , header);
		return MessageDTO.builder()
				.code("1")
				.message("댓글을 등록했습니다.")
				.build();
	}
	
	@RequestMapping(value = "/comment/{commentId}" , method = RequestMethod.DELETE)
	public MessageDTO removeCommentData(@PathVariable(name = "commentId") String commentId , HttpServletRequest request) {
		String header = request.getHeader("Authorization");
		postService.deleteComment(commentId , header);
		return MessageDTO.builder()
				.code("1")
				.message("댓글을 삭제했습니다.")
				.build();
	}
}