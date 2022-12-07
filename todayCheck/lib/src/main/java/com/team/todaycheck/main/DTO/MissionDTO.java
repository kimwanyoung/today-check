package com.team.todaycheck.main.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

import io.swagger.annotations.ApiParam;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class MissionDTO {
	@ApiParam(value = "�ĺ���")
    private Long id;
	
	@ApiParam(value = "������")
    private ParticipantDTO admin;
	
	@ApiParam(value = "�����ڵ�")
	private List<ParticipantDTO> participants;

	@ApiParam(value = "�̼� ����Ʈ Ÿ��Ʋ")
    private String postTitle;
	
	@ApiParam(value = "����Ʈ �����")
    private String postPicture;
	
	@ApiParam(value = "�̼� ����Ʈ ����")
    private String postContent;

	@ApiParam(value = "�̼� ���� ����")
    private LocalDateTime startDate;
	
	@ApiParam(value = "�̼� ���� ����")
    private LocalDateTime endDate;
}
