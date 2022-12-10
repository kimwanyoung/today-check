package com.team.todaycheck.main.service;

import java.util.List;

import javax.security.auth.login.AccountNotFoundException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.todaycheck.main.DTO.MessageDTO;
import com.team.todaycheck.main.DTO.ModifyProfileDTO;
import com.team.todaycheck.main.DTO.ProfileDTO;
import com.team.todaycheck.main.DTO.ProfileMissionDTO;
import com.team.todaycheck.main.entity.UserEntity;
import com.team.todaycheck.main.exception.DuplicateAccountException;
import com.team.todaycheck.main.repository.ProfileRepository;
import com.team.todaycheck.main.repository.UserRepository;

@Service
@Transactional
public class ProfileService {
	
	@Autowired ProfileRepository profileRepos;
	@Autowired UserRepository userRepos;
	
	public ProfileDTO getProfile(String accoundId) throws AccountNotFoundException {
		UserEntity user = profileRepos.findById(accoundId);
		if(user == null) throw new AccountNotFoundException("존재하지 않는 회원 정보입니다.");
		List<ProfileMissionDTO> joinMission = profileRepos.getJoinMissionList(accoundId);
		List<ProfileMissionDTO> createMission = profileRepos.getCreateEntity(accoundId);
		
		// fetch() 결과 빈값은 null을 넣기때문에 null값 제거
		if(joinMission.get(0).getId() == null) joinMission.remove(0);
		if(createMission.get(0).getId() == null) createMission.remove(0);
		
		return ProfileDTO.builder()
				.userId(user.getUserId())
				.id(user.getId())
				.password(user.getPassword())
				.roles(user.getRoles())
				.address(user.getAddress())
				.phoneNumber(user.getPhoneNumber())
				.joinMission(joinMission)
				.createMission(createMission)
				.build();
	}

	public MessageDTO updateProfile(String accoundId , ModifyProfileDTO profileDTO , String header
			, HttpServletResponse response)	throws AccountNotFoundException {
		
		UserEntity user = profileRepos.findById(accoundId);
		String userToken = PostService.getUserIdFromToken(header);
		
		if(user == null) throw new AccountNotFoundException("계정을 찾을 수 없습니다.");
		if(profileDTO.getUserId() == null || !userToken.equals(profileDTO.getUserId())) 
			throw new AccountNotFoundException("계정 소유자만 계정을 변경할 수 있습니다.");
		
		if(!profileDTO.getUserId().equals(profileDTO.getId())) { // 음 계정 아이디가 변경되었을 경우
			UserEntity result = userRepos.findById(profileDTO.getId());
			if(result != null) throw new DuplicateAccountException("이미 존재하는 회원입니다.");
			
			Cookie myCookie = new Cookie("refreshToken", null);
			myCookie.setMaxAge(0);
			myCookie.setPath("/"); // refreshToken 폐기
			
			profileRepos.setUserFromContent(profileDTO.getUserId() , profileDTO.getId());
		}
		
		user.setId(profileDTO.getId());
		user.setPassword(profileDTO.getPassword());
		user.setAddress(profileDTO.getAddress());
		user.setPhoneNumber(profileDTO.getPhoneNumber());
		
		return MessageDTO.builder()
				.code("1")
				.message("정보를 업데이터했습니다.")
				.build();
	}
}