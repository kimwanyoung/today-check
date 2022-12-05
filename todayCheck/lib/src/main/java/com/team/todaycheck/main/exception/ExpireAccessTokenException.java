package com.team.todaycheck.main.exception;

@SuppressWarnings("serial")
public class ExpireAccessTokenException extends RuntimeException {
	
	public ExpireAccessTokenException(String message) {
		super(message);
	}
}
