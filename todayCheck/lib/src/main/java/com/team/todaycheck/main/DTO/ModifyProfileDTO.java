package com.team.todaycheck.main.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ModifyProfileDTO {
	private String userId;
	private String id;
	private String password;
	private String address;
	private String phoneNumber;
}
