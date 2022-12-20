package com.team.todaycheck.main.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

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
	
	@JsonFormat(shape = JsonFormat.Shape.STRING , pattern = "yyyy-MM-dd HH:mm:ss" , timezone = "Asia/Seoul")
	@Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
	private Date checkDate;
}
