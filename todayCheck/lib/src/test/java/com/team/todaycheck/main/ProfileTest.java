package com.team.todaycheck.main;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThrows;

import javax.security.auth.login.AccountException;
import javax.transaction.Transactional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import com.team.todaycheck.main.DTO.MessageDTO;
import com.team.todaycheck.main.DTO.ModifyProfileDTO;
import com.team.todaycheck.main.DTO.ProfileDTO;
import com.team.todaycheck.main.DTO.RegistryDTO;
import com.team.todaycheck.main.controller.ProfileController;
import com.team.todaycheck.main.exception.DuplicateAccountException;
import com.team.todaycheck.main.repository.UserRepository;
import com.team.todaycheck.main.service.LoginService;
import com.team.todaycheck.main.service.ProfileService;

@Transactional // 해당 어노테이션이 있어야 테스트 종료 후 RollBack
@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS) // @BerforeAll 을 위한..
@Rollback(value = true)
public class ProfileTest {
	
	@Autowired ProfileController profileController;
	@Autowired ProfileService profileService;
	@Autowired LoginService loginService;
	@Autowired UserRepository userRepos;
	
	private String testUserId = "wfa3fg51qqeRTf351wD";
	private String testUserPw = "FgG34lcp091xZCbnfaw";
	private String testerHeader1 = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3ZmEzZmc1MXFxZVJUZjM1MXdEIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY2OTczMzc1OSwiZXhwIjoxNjY5NzM1NTU5fQ.ZcO1cZIy1S-Rx3_N6s7Zh1U4MxcjEcTEy83fQsFIG2A";
	
	private String testUserId2 = "Fge4t313ERW11e25O92";
	private String testUserPw2 = "Vbz21AF41gyu6IUk542";
	private String testerHeader2 = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJGZ2U0dDMxM0VSVzExZTI1TzkyIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY2OTczMzc1OSwiZXhwIjoxNjY5NzM1NTU5fQ.2XTl0wIbAExqxtJEy6cBzKo-s2CY5PhAEZ3l1q6krPg";
	
	@Test
	@Order(1)
	@DisplayName("사용자 정보 변경")
	public void testUserInfoChange() throws AccountException {
		loginService.createId(RegistryDTO.builder()
				.id(testUserId)
				.password(testUserPw)
				.build());
		
		ModifyProfileDTO modifyData = ModifyProfileDTO.builder()
			.userId(testUserId)
			.id("UFNFt414TGRr31rfFE1")
			.password(testUserPw)
			.address("address")
			.phoneNumber("01012341234")
		.build();
		
		MessageDTO result = profileService.updateProfile(testUserId, modifyData , testerHeader1, null);
		assertEquals(result.getCode() , "1");
	}
	
	@Test
	@Order(2)
	@DisplayName("중복된 아이디 변경 오류")
	public void changeExistUserNameChange() throws AccountException {
		loginService.createId(RegistryDTO.builder()
				.id(testUserId)
				.password(testUserPw)
				.build());
		
		loginService.createId(RegistryDTO.builder()
				.id(testUserId2)
				.password(testUserPw2)
				.build());
		
		ModifyProfileDTO modifyData = ModifyProfileDTO.builder()
			.userId(testUserId2)
			.id(testUserId)
			.password(testUserPw2)
			.address("address")
			.phoneNumber("01012341234")
		.build();
		
		assertThrows(DuplicateAccountException.class , () -> profileService.updateProfile(testUserId2 , modifyData , testerHeader2, null));
	}
	
	@Test
	@Order(3)
	@DisplayName("사용자 정보 가져오기")
	public void getUserData() throws AccountException {
		loginService.createId(RegistryDTO.builder()
				.id(testUserId)
				.password(testUserPw)
				.build());
		
		ProfileDTO result = profileController.getUserProfile(testUserId);
		assertNotNull(result);
	}
	
}