package com.team.todaycheck.main.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.security.auth.login.AccountException;

import org.springframework.stereotype.Service;

import com.team.todaycheck.main.DTO.MissionDTO;
import com.team.todaycheck.main.DTO.ParticipantDTO;
import com.team.todaycheck.main.DTO.RegistryDTO;
import com.team.todaycheck.main.entity.Mission;
import com.team.todaycheck.main.entity.UserEntity;
import com.team.todaycheck.main.repository.IMissionRepository;
import com.team.todaycheck.main.repository.UserRepository;
import com.team.todaycheck.main.service.IMissionService;
import com.team.todaycheck.main.service.LoginService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MissionService implements IMissionService {
	private final IMissionRepository missionRepository;
	private final UserRepository userRepository;
	private final LoginService loginService;
	
	@PostConstruct
	void init() throws Exception {
		if (userRepository.count() < 3) {
			loginService.createId(RegistryDTO.builder()
					.id("demo@example.com")
					.password("")
					.build());
			
			loginService.createId(RegistryDTO.builder()
					.id("demo2@example.com")
					.password("")
					.build());
			
			loginService.createId(RegistryDTO.builder()
					.id("demo3@example.com")
					.password("")
					.build());
		}
		
		
		if (missionRepository.count() == 0) {
		
			// demo data
			for (int i = 0; i < 10; i++) {
				List<UserEntity> participants = new ArrayList<>();
				participants.add(UserEntity.builder()
						.userId(2L).build());
				participants.add(UserEntity.builder()
						.userId(3L).build());
				
				LocalDateTime endDate = LocalDateTime.now();
				endDate.plusMonths(1);
					
				Mission mission = Mission.builder()
						.title("go gym everyday")
						.content("to go gym every day in 2 months!")
						.thumbnail("https://via.placeholder.com/350x150")
						.admin(UserEntity.builder().userId(1L).build())
						.participants(participants)
						.startDate(LocalDateTime.now())
						.endDate(endDate)
						.build(); 
				
				missionRepository.save(mission);
			}
		}
	}

	@Override
	public MissionDTO save(MissionDTO dto) {
		Mission result = missionRepository.save(toEntity(dto));
		return fromEntity(result);
	}
	
	@Override
	public List<MissionDTO> findAll() {
		List<MissionDTO> missions = missionRepository.findAll().stream().map(x -> fromEntity(x)).collect(Collectors.toList());
		return missions;
	}

	@Override
	public MissionDTO findById(long id) {
		Optional<Mission> result = missionRepository.findById(id);
		if (result.isEmpty()) {
			return null;
		}
		
		return fromEntity(result.get());
	}

	public static MissionDTO fromEntity(Mission mission) {
		List<ParticipantDTO> participants = new ArrayList<>();
		for (UserEntity entity : mission.getParticipants()) {
			ParticipantDTO dto = ParticipantDTO.builder()
					.id(entity.getUserId())
					.name(entity.getId())
					.avater("https://firebasestorage.googleapis.com/v0/b/instagram-clone-eb58a.appspot.com/o/default-profile.png?alt=media&token=30f8935d-0920-4ba7-960d-bcf35a0d26aa")
					.build();
			participants.add(dto);
		}
		
		return MissionDTO.builder()
				.id(mission.getId())
				.admin(ParticipantDTO.builder()
						.id(mission.getAdmin().getUserId())
						.name(mission.getAdmin().getId())
						.avater("https://firebasestorage.googleapis.com/v0/b/instagram-clone-eb58a.appspot.com/o/default-profile.png?alt=media&token=30f8935d-0920-4ba7-960d-bcf35a0d26aa")
						.build())
				.postTitle(mission.getTitle())
				.postContent(mission.getContent())
				.postPicture(mission.getThumbnail())
				.participants(participants)
				.startDate(mission.getStartDate())
				.endDate(mission.getEndDate())
				.build();
	}
	
	public static Mission toEntity(MissionDTO dto) {
		List<UserEntity> participants = new ArrayList<>();
		for (ParticipantDTO participant : dto.getParticipants()) {
			participants.add(UserEntity.builder()
					.userId(participant.getId())
					.build());
		}
		
		return Mission.builder()
				.id(dto.getId())
				.title(dto.getPostTitle())
				.admin(UserEntity.builder().userId(dto.getAdmin().getId()).build())
				.content(dto.getPostContent())
				.thumbnail(dto.getPostPicture())
				.participants(participants)
				.startDate(dto.getStartDate())
				.endDate(dto.getEndDate())
				.build();
	}

	@Override
	public MissionDTO addParticipant(MissionDTO dto, ParticipantDTO participant) {
		// TODO Auto-generated method stub
		return null;
	}
}
