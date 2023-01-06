package com.team.todaycheck.main.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import com.team.todaycheck.main.DTO.MissionDTO;
import com.team.todaycheck.main.entity.Mission;
import com.team.todaycheck.main.service.PostService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import com.team.todaycheck.main.DTO.ParticipantsMissionDTO;
import com.team.todaycheck.main.service.IMissionService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

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
    public List<ParticipantsMissionDTO> getAll() {
    	return missionService.findAll();
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
	public List<ParticipantsMissionDTO> getMissionById(@ApiParam(value = "사용자 아이디", required = true, example = "1") @PathVariable long id) {
		return missionService.findMission(id);
	}

	@PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
	@ApiOperation(value = "미션 등록", notes = "미션을 등록한다")
	@ApiResponses(value = {
			@ApiResponse(code = 200, message = "성공적으로 등록함"),
			@ApiResponse(code = 401, message = "등록 실패"),
			@ApiResponse(code = 500, message = "서버 오류"),
	})
	public ResponseEntity insert(@RequestPart(value="data") Mission mission, @RequestPart(value="multipartFile") MultipartFile multipartFile, @CookieValue(name = "refreshToken") String cookie) {
		try {
			if (!missionService.save(mission, multipartFile, cookie)){
				return ResponseEntity.status(401).build();
			}
			return ResponseEntity.status(200).build();
		} catch (Exception e) {
			return ResponseEntity.status(500).build();
		}
	}

	@GetMapping(value = "/thumbnail/{missionId}")
	public ResponseEntity<byte[]> getThumbnail(@PathVariable("missionId") long missionId) throws FileNotFoundException {
		ResponseEntity<byte[]> result = null;
		Mission mission = missionService.findById(missionId);
		HttpHeaders header = new HttpHeaders();

		Path path = Paths.get(PostService.fileDir, mission.getThumbnail());
		File file = new File(path.toString());

		try {
			header.add("Content-Type" , Files.probeContentType(path));
			result = new ResponseEntity<byte[]>(FileCopyUtils.copyToByteArray(file) , header , HttpStatus.OK);
		} catch (IOException e) {
			throw new FileNotFoundException("이미지 파일을 찾지 못했습니다.");
		}
		return result;
	}
}