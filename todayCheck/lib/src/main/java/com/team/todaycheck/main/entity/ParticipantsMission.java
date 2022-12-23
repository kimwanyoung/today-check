package com.team.todaycheck.main.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ParticipantsMission {
	
	@Id
	@GeneratedValue
	@Column(name = "Participants_Mission_id")
	private Long keys;
	
	@JoinColumn(name = "mission_id")
	@ManyToOne(fetch = FetchType.LAZY , cascade = CascadeType.PERSIST)
	private Mission mission;
	
	@JoinColumn(name = "participants_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private UserEntity participants;
	
	@OneToMany(mappedBy = "participantsMission" , cascade = CascadeType.PERSIST , fetch = FetchType.LAZY , orphanRemoval = true)
	private List<MissionCertification> missionCertification;
	
	// 연관관계 편의 메소드
	public void addMissionCertification(MissionCertification missionCertification) {
		this.missionCertification.add(missionCertification);
		missionCertification.setParticipantsMission(this);
	}
}
