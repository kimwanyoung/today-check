package com.team.todaycheck.main.controller;

import java.io.IOException;

import javax.security.auth.login.AccountNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.team.todaycheck.main.DTO.MessageDTO;
import com.team.todaycheck.main.DTO.ModifyProfileDTO;
import com.team.todaycheck.main.DTO.ProfileDTO;
import com.team.todaycheck.main.exception.NotAuthorizationException;
import com.team.todaycheck.main.service.ProfileService;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "*" , allowedHeaders = "*")
public class ProfileController {

	@Autowired ProfileService profileService;
	
	@RequestMapping(value = "/profile/{accoundId}" , method = RequestMethod.GET)
	public ProfileDTO getUserProfile(@PathVariable("accoundId") String accoundId) throws AccountNotFoundException {
		
		return profileService.getProfile(accoundId);
	}
	
	@RequestMapping(value = "/profile/{accoundId}" , method = RequestMethod.PATCH , consumes = {MediaType.APPLICATION_JSON_VALUE , MediaType.MULTIPART_FORM_DATA_VALUE})
	public MessageDTO updateUserProfile(@PathVariable("accoundId") String accoundId , @RequestPart(value = "request") ModifyProfileDTO profileDTO ,
		@RequestPart("image") MultipartFile imgFile , HttpServletRequest request , HttpServletResponse response) 
				throws NumberFormatException, AccountNotFoundException, IllegalStateException, IOException {
		
		String header = request.getHeader("Authorization");
		if(header == null) throw new NotAuthorizationException("Authorization 토큰이 없습니다.");
		return profileService.updateProfile(accoundId , profileDTO , header , response , imgFile);
	}
}