package com.team.todaycheck.main.controller;

import java.io.IOException;

import javax.security.auth.login.AccountNotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.team.todaycheck.main.DTO.MessageDTO;
import com.team.todaycheck.main.DTO.MissionCertificationDTO;
import com.team.todaycheck.main.service.IMissionService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/participant")
public class ParticipantController {
	
	private final IMissionService missionService;
	
	@GetMapping(value = "")
	public ResponseEntity<String> list() {
		return ResponseEntity.ok("a");
	}
	
	@PostMapping(value = "/{id}")
    @ApiOperation(value = "미션 참여", notes = "주어진 미션 아이디를 가진 미션에 참여한다")
    @ApiResponses(value = { 
    		@ApiResponse(code = 200, message = "성공적으로 참여함"),
    		@ApiResponse(code = 401, message = "권한 없음"),
    		@ApiResponse(code = 409, message = "이미 참여함"),
    		@ApiResponse(code = 500, message = "서버 오류"),
	})
    public ResponseEntity join(@PathVariable long id, @CookieValue(name = "refreshToken") String cookie) throws Exception {
    	
		return missionService.joinMission(id , cookie);
	
	}
	
	@DeleteMapping(value = "/{id}")
	@ApiOperation(value = "미션 탈퇴", notes = "주어진 미션 아이디를 가진 미션에서 탈퇴한다")
    @ApiResponses(value = { 
    		@ApiResponse(code = 200, message = "성공적으로 탈퇴함"),
    		@ApiResponse(code = 401, message = "권한 없음"),
    		@ApiResponse(code = 500, message = "서버 오류"),
	})
	public ResponseEntity leave(@PathVariable long id, @CookieValue(name = "refreshToken") String cookie) throws Exception {
    	return missionService.leaveMission(id , cookie);
    }
	
	@RequestMapping(value = "/certification/{id}" , method = RequestMethod.POST)
	public MessageDTO certifyMission(@PathVariable("id") Long id , @RequestParam(name = "image") MultipartFile image , 
			@CookieValue(name = "refreshToken") String cookie) throws AccountNotFoundException, IllegalStateException, IOException {
		return missionService.certifyMission(id , image , cookie);
	}
	
	@RequestMapping(value = "/certification/{id}" , method = RequestMethod.GET)
	public MissionCertificationDTO getCertifyMission(@PathVariable("id") Long id) {
		return missionService.getCertifyMission(id);
	}
}