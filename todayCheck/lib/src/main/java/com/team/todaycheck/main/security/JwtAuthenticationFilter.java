package com.team.todaycheck.main.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

public class JwtAuthenticationFilter extends GenericFilterBean {

	private JwtTokenProvider jwtTokenProvider;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		String token = jwtTokenProvider.resolveToken((HttpServletRequest) request); // 헤더에서 JWT 추출
		if (token != null && jwtTokenProvider.validateToken(token)) { // 유효한 토큰?
			Authentication authentication = jwtTokenProvider.getAuthentication(token); // 유효한 토큰의 정보를 가져옴
			SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContext 에 Authentication
			// 객체를 저장
		}
		chain.doFilter(request, response);
	}

	public JwtAuthenticationFilter(JwtTokenProvider jwtTokenProvider) {
		this.jwtTokenProvider = jwtTokenProvider;
	}
}
