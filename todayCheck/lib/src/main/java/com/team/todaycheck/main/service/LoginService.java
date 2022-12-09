package com.team.todaycheck.main.service;

import java.util.Collections;

import javax.security.auth.login.AccountException;
import javax.security.auth.login.AccountNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.todaycheck.main.DTO.LoginRequestDTO;
import com.team.todaycheck.main.DTO.LoginResponseDTO;
import com.team.todaycheck.main.DTO.MessageDTO;
import com.team.todaycheck.main.DTO.RegistryDTO;
import com.team.todaycheck.main.entity.Token;
import com.team.todaycheck.main.entity.UserEntity;
import com.team.todaycheck.main.entity.UserEntity.Admin;
import com.team.todaycheck.main.repository.UserRepository;
import com.team.todaycheck.main.security.JwtTokenProvider;

@Service
public class LoginService {
	@Autowired
	private UserRepository userRepos;
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	@Autowired
	private JwtService jwtService;

	public LoginResponseDTO findId(LoginRequestDTO data) throws AccountNotFoundException {
		UserEntity result = userRepos.findById(data.getId());
		if (result == null)
			throw new AccountNotFoundException("존재하지 않는 아이디입니다.");
		if (!result.getPassword().equals(data.getPassword())) {
			throw new AccountNotFoundException("비밀번호가 일치하지 않습니다.");
		}

		Token tokenDTO = jwtTokenProvider.createAccessToken(result.getUsername(), result.getRoles());
		jwtService.login(tokenDTO);

		return LoginResponseDTO.builder()
				.id(result.getId())
				.password(result.getPassword())
				.code("1")
				.accessToken(tokenDTO.getAccessToken())
				.refreshToken(tokenDTO.getRefreshToken())
				.grantType(tokenDTO.getGrantType())
				.build();
	}

	public MessageDTO createId(RegistryDTO data) throws AccountException {
		try {
			UserEntity findId = userRepos.findById(data.getId());
			if (findId != null)
				throw new AccountException("이미 존재하는 아이디입니다.");
			UserEntity result = UserEntity.builder()
					.id(data.getId())
					.password(data.getPassword())
					.roles(Collections.singletonList("ROLE_USER"))
					.admin(Admin.GENERAL)
					.build();

			userRepos.save(result);
		} catch(AccountException e) {
			throw new AccountException(e.getMessage());
		} catch (Exception e) {
			return MessageDTO.builder()
					.code("-1")
					.message("서버에 오류가 발생했습니다. 잠시후 다시 이용해주세요.")
					.build();
		}
		return MessageDTO.builder()
				.code("1")
				.message("성공적으로 회원가입이 되었습니다.")
				.build();
	}
}
