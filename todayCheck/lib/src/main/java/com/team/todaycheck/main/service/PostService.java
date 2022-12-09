package com.team.todaycheck.main.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;
import java.util.UUID;

import javax.transaction.Transactional;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.team.todaycheck.main.DTO.CommentDTO;
import com.team.todaycheck.main.DTO.PostDTO;
import com.team.todaycheck.main.entity.Comment;
import com.team.todaycheck.main.entity.Post;
import com.team.todaycheck.main.entity.UserEntity;
import com.team.todaycheck.main.exception.FalsifyTokenException;
import com.team.todaycheck.main.exception.InvalidateTokenException;
import com.team.todaycheck.main.exception.NotAuthorizationException;
import com.team.todaycheck.main.exception.UnknownPostException;
import com.team.todaycheck.main.repository.CommentRepository;
import com.team.todaycheck.main.repository.PostRepository;
import com.team.todaycheck.main.repository.UserRepository;

@Service
@Transactional
public class PostService {
	
	@Autowired PostRepository postRepos;
	@Autowired UserRepository userRepos;
	@Autowired CommentRepository commentRepos;
	
	private String fileDir = "C:\\devtool\\upload\\";
	
	public int addPost(PostDTO post , MultipartFile imgFile , String header) throws IllegalStateException, IOException {
		String userId = getUserIdFromToken(header);
		UserEntity user = userRepos.findById(userId);
		
		if(user == null) throw new FalsifyTokenException("토큰이 변조되었거나 손상되었습니다.");

		post.setWriter(userId);
		Post postData = toEntity(post);
		// 이미지 추출
		if(imgFile != null) {
			String origName = imgFile.getOriginalFilename();
			String uuid = UUID.randomUUID().toString(); // 중복을 처리하기 위한 UUID
			String extension = origName.substring(origName.lastIndexOf(".")); // 확장자 추출
			String savedName = uuid + extension;
			
			imgFile.transferTo(new File(fileDir + savedName)); // 파일 저장
			postData.setThumbnail(savedName);
		}
		
		user.addpost(postData);
		
		return postRepos.getPostKeyMaxValue();
	}
	
	public List<PostDTO> getAllPost(Pageable pageable) {
		HttpHeaders header = new HttpHeaders();
		List<PostDTO> result = postRepos.getAllPost(pageable);
		File imageFile;
		for(PostDTO data : result) {
			imageFile = new File(fileDir + data.getThumbnail());
			try {
				if(Files.probeContentType(imageFile.toPath()) != null) header.set("Content-Type" , Files.probeContentType(imageFile.toPath()));
				data.setImage(new ResponseEntity<byte[]>(FileCopyUtils.copyToByteArray(imageFile) , header , HttpStatus.OK));
			} catch (IOException e) { // 썸네일이 없을 때
				data.setImage(null);
			}
		}
		
		return result;
	}
	
	public PostDTO getOnePost(int postnumber) {
		postRepos.updateView(postnumber);
		HttpHeaders header = new HttpHeaders();
		PostDTO data = PostService.fromEntity(postRepos.findByPostKey(postnumber));
		File imageFile = new File(fileDir + data.getThumbnail());
		try {
			if(Files.probeContentType(imageFile.toPath()) != null) header.set("Content-Type" , Files.probeContentType(imageFile.toPath()));
			data.setImage(new ResponseEntity<byte[]>(FileCopyUtils.copyToByteArray(imageFile) , header , HttpStatus.OK));
		} catch (IOException e) { // 썸네일파일을 찾을 수 없을 때
			data.setImage(null);
		}
		
		return data;
	}
	
	public static Post toEntity(PostDTO post) {
		return Post.builder()
				.postKey(post.getPostKey())
				.title(post.getTitle())
				.writer(post.getWriter())
				.description(post.getDescription())
				.thumbnail(post.getThumbnail())
				.build();
	}
	
	public static PostDTO fromEntity(Post post) {
		return PostDTO.builder()
				.postKey(post.getPostKey())
				.title(post.getTitle())
				.writer(post.getWriter())
				.description(post.getDescription())
				.thumbnail(post.getThumbnail())
				.date(post.getDate())
				.views(post.getViews())
				.recommendation(post.getRecommendation())
				.build();
	}

	public void deletePost(String postNumber , String header) {
		String userId = getUserIdFromToken(header);
		
		if(postRepos.deleteOnePost(Integer.parseInt(postNumber) , userId) != 1L) {
			throw new NotAuthorizationException("게시물 번호가 잘못되었거나 , 해당 게시글은 작성자만 지울 수 있습니다.");
		}
	}

	public void modifyPost(PostDTO postData , int postNumber , String header) {
		String userId = getUserIdFromToken(header);
		Post post = postRepos.findByPostKey(postNumber , userId);
		
		if(post == null) {
			throw new UnknownPostException("작성자가 다르거나 , 알 수 없는 페이지입니다.");
		}
		post.setDescription(postData.getDescription());
		post.setThumbnail(postData.getThumbnail());
		post.setTitle(postData.getTitle());
	}

	public boolean increaseRecommendation(String postNumber , String header) {
		String userId = getUserIdFromToken(header);
		
		return postRepos.increaseRecommander(Integer.parseInt(postNumber), userId);
	}

	public void addComment(String postNumber, CommentDTO CommentDTO, String header) {
		String userId = getUserIdFromToken(header);
		
		Post result = postRepos.findByPostKey(Integer.parseInt(postNumber));
		result.addComment(Comment.builder()
				.writer(userId)
				.content(CommentDTO.getContent())
				.build());
	}

	public void deleteComment(String commentId , String header) {
		String userId = getUserIdFromToken(header);
		if (commentRepos.deleteComment(Long.parseLong(commentId) , userId) != 1L) {
			throw new InvalidateTokenException("댓글 ID가 잘못되었거나 , 해당 게시글은 작성자만 지울 수 있습니다.");
		};
	}
	
	public static String getUserIdFromToken(String header) {
				// We need a signing key, so we'll create one just for this example. Usually
				// the key would be read from your application configuration instead.
				String[] split_string = header.split("\\.");
		        String base64EncodedBody = split_string[1];
		        Base64 base64Url = new Base64(true);
		        
		        //~~~~~~~~~ JWT Body ~~~~~~~~~
		        String body = new String(base64Url.decode(base64EncodedBody));
		        // System.out.println("JWT Body : "+body);
		        // JWT Body Ex ) {"sub":"thisisid","roles":["ROLE_USER"],"iat":1669686350,"exp":1669688150}
		        
		        JsonParser parser = new JsonParser();
				JsonElement element = parser.parse(body);
				
				return element.getAsJsonObject().get("sub").getAsString();
				// parsing END
	}

	public File getImageData(String postNumber) {
		String fileName = postRepos.getImagefileName(Integer.parseInt(postNumber));
		return new File(fileDir + fileName);
	}
}
