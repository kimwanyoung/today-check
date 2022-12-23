package com.team.todaycheck.main.service;

import java.io.IOException;
import java.util.List;

import javax.security.auth.login.AccountNotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.team.todaycheck.main.DTO.MessageDTO;
import com.team.todaycheck.main.DTO.MissionCertificationDTO;
import com.team.todaycheck.main.DTO.MissionDTO;
import com.team.todaycheck.main.DTO.ParticipantDTO;
import com.team.todaycheck.main.DTO.ParticipantsMissionDTO;
import com.team.todaycheck.main.entity.Mission;
import com.team.todaycheck.main.entity.ParticipantsMission;

public interface IMissionService {
	MissionDTO save(MissionDTO dto);
	MissionDTO addParticipant(MissionDTO dto, ParticipantDTO participant);
	
	public List<ParticipantsMissionDTO> findAll();
	Mission findById(Long id);
	
	List<ParticipantsMissionDTO> findMission(Long i);
	ResponseEntity leaveMission(long id, String cookie);
	ResponseEntity joinMission(long id, String cookie);
	MessageDTO certifyMission(Long id, MultipartFile image, String cookie) throws AccountNotFoundException, IllegalStateException, IOException;
	MissionCertificationDTO getCertifyMission(Long id);
	
}
