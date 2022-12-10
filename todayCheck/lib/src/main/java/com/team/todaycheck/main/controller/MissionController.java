package com.team.todaycheck.main.controller;

import com.team.todaycheck.main.DTO.MissionDTO;
import com.team.todaycheck.main.DTO.ParticipantDTO;
import com.team.todaycheck.main.service.IMissionService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mission")
public class MissionController {
	
	private final IMissionService missionService;
	
	/**
	 * 현재 등록된 모든 미션을 조회한다
	 * @return 등록된 모든 미션
	 */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "모든 미션 조회", notes = "현재 등록된 모든 미션을 조회한다")
    @ApiResponses(value = { 
    		@ApiResponse(code = 200, message = "성공적으로 조회됨"),
    		@ApiResponse(code = 500, message = "서버 오류"),
	})
    public ResponseEntity<List<MissionDTO>> getAll() {
    	List<MissionDTO> list = missionService.findAll();
        return ResponseEntity.ok().body(list);
    }

    /**
     * 주어진 아이디를 가진 미션을 반환한다
     * 
     * @param id	검색할 미션
     * @return 검색된 미션
     */
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "주어진 아이디를 가진 미션 조회", notes = "주어진 아이디를 가진 미션을 조회한다")
    @ApiResponses(value = { 
    		@ApiResponse(code = 200, message = "성공적으로 조회됨"),
    		@ApiResponse(code = 400, message = "아이디 형식이 올바르지 않음"),
    		@ApiResponse(code = 404, message = "주어진 아이디를 가진 미션이 존재하지 않음"),
    		@ApiResponse(code = 500, message = "서버 오류"),
	})
    public ResponseEntity<MissionDTO> getMissionById(@ApiParam(value = "사용자 아이디", required = true, example = "1") @PathVariable long id) {
    	MissionDTO mission = missionService.findById(id);
    	if (mission == null) {
    		return ResponseEntity.notFound().build();
    	}
        
        return ResponseEntity.ok().body(mission);
    }
}