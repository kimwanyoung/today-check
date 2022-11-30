package com.team.todaycheck.main.exception;

@SuppressWarnings("serial")
public class UnknownPostException extends RuntimeException {

	public UnknownPostException() {
		
	}
	
	public UnknownPostException(String message) {
		super(message);
	}
}
