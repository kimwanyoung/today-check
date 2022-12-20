package com.team.todaycheck.main.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.team.todaycheck.main.DTO.MissionDTO;
import com.team.todaycheck.main.DTO.ParticipantDTO;
import com.team.todaycheck.main.DTO.ProfileMissionDTO;
import com.team.todaycheck.main.entity.Mission;
import com.team.todaycheck.main.entity.ParticipantsMission;
import com.team.todaycheck.main.entity.RefreshToken;
import com.team.todaycheck.main.entity.UserEntity;
import com.team.todaycheck.main.repository.IMissionRepository;
import com.team.todaycheck.main.repository.ParticipantMissionRepository;
import com.team.todaycheck.main.repository.ProfileRepository;
import com.team.todaycheck.main.repository.UserRepository;
import com.team.todaycheck.main.service.IMissionService;
import com.team.todaycheck.main.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MissionService implements IMissionService {
	private final IMissionRepository missionRepository;
	private final UserRepository userRepository;
//	private final LoginService loginService;
	private final ParticipantMissionRepository partMissionRepository;
	private final ProfileRepository profileRepos;
	private final JwtService jwtService;
	
	/*
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
		
		
		if (partMissionRepository.count() == 0) {
		
			UserEntity user = userRepository.findById("demo@example.com");
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
						.participants(null)
						.startDate(LocalDateTime.now())
						.endDate(endDate)
						.build(); 
				
				ParticipantsMission result = ParticipantsMission.builder()
						.mission(mission)
						.participants(user)
						.build();
				
				partMissionRepository.save(result);
			}
		}
	}
	*/
	
	@Override
	public MissionDTO save(MissionDTO dto) {
		Mission result = missionRepository.save(toEntity(dto));
		return fromEntity(result);
	}
	
	@Override
	public List<ParticipantsMission> findAll() {
		return partMissionRepository.findAllMission();
	}
	

	public static MissionDTO fromEntity(Mission mission) {
		/*
		List<ParticipantDTO> participants = new ArrayList<>();
		for (UserEntity entity : mission.getParticipants()) {
			ParticipantDTO dto = ParticipantDTO.builder()
					.id(entity.getUserId())
					.email(entity.getId())
					.name(entity.getId())
					.avater("https://firebasestorage.googleapis.com/v0/b/instagram-clone-eb58a.appspot.com/o/default-profile.png?alt=media&token=30f8935d-0920-4ba7-960d-bcf35a0d26aa")
					.build();
			participants.add(dto);
		}
		*/
		
		return MissionDTO.builder()
				.id(mission.getId())
				.admin(ParticipantDTO.builder()
						.id(mission.getAdmin().getUserId())
						.email(mission.getAdmin().getId())
						.name(mission.getAdmin().getId())
						.avater("https://firebasestorage.googleapis.com/v0/b/instagram-clone-eb58a.appspot.com/o/default-profile.png?alt=media&token=30f8935d-0920-4ba7-960d-bcf35a0d26aa")
						.build())
				.postTitle(mission.getTitle())
				.postContent(mission.getContent())
				.postPicture(mission.getThumbnail())
				.participants(null)
				.startDate(mission.getStartDate())
				.endDate(mission.getEndDate())
				.build();
	}
	
	public static Mission toEntity(MissionDTO dto) {
		return Mission.builder()
				.id(dto.getId())
				.title(dto.getPostTitle())
				.admin(UserEntity.builder().userId(dto.getAdmin().getId()).build())
				.content(dto.getPostContent())
				.thumbnail(dto.getPostPicture())
				.participants(null)
				.startDate(dto.getStartDate())
				.endDate(dto.getEndDate())
				.build();
	}

	@Override
	public MissionDTO addParticipant(MissionDTO dto, ParticipantDTO participant) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ParticipantsMission> findMission(Long i) {
		return partMissionRepository.findMission(i);
	}

	@Override
	public Mission findById(Long id) {
		return missionRepository.findById(id).get();
	}

	@Override
	public ResponseEntity leaveMission(long id, String cookie) {
		Mission mission = findById(id);
    	if (mission == null) {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    	}
    	
    	Optional<RefreshToken> o = jwtService.getRefreshToken(cookie);
    	
    	RefreshToken token = o.orElse(null);
    	if (token == null) {
    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    	}
    	
    	UserEntity user = userRepository.findById(token.getKeyEmail());
    	partMissionRepository.leaveMission(user.getUserId() , id);
    	
        return ResponseEntity.ok().build();
	}

	@Override
	public ResponseEntity<Object> joinMission(long id , String cookie) {
		Mission mission = findById(id);
    	
    	if (mission == null) {
    		return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    	}
    	
    	Optional<RefreshToken> o = jwtService.getRefreshToken(cookie);
    	
    	RefreshToken token = o.orElse(null);
    	if (token == null) {
    		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    	}
    	
    	UserEntity user = userRepository.findById(token.getKeyEmail());
    	List<ProfileMissionDTO> joinMission = profileRepos.getJoinMissionList(user.getId());
    	
    	for (ProfileMissionDTO participant : joinMission) {
    		if (participant.getId() == id) {
    			return ResponseEntity.status(HttpStatus.CONFLICT).build();
    		}
    	}
    	
    	ParticipantsMission participant = ParticipantsMission.builder()
    			.mission(mission)
    			.participants(user)
    			.build();
    	
    	partMissionRepository.save(participant);
    	
    	return ResponseEntity.ok().build();

	}
}