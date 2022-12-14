package com.team.todaycheck.main.exception;

@SuppressWarnings("serial")
public class DuplicateAccountException extends RuntimeException {

	public DuplicateAccountException(String message) {
		super(message);
	}
	
}
