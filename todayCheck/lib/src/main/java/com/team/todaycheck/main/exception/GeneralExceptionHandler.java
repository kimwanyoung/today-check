package com.team.todaycheck.main.exception;

import java.util.NoSuchElementException;

import javax.security.auth.login.AccountException;
import javax.security.auth.login.AccountNotFoundException;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.team.todaycheck.main.DTO.MessageDTO;

@RestControllerAdvice
public class GeneralExceptionHandler {
	@ExceptionHandler({
		AccountException.class , AccountNotFoundException.class , NotAuthorizationException.class , NoSuchElementException.class
		, UnknownPostException.class
	})
	public MessageDTO handleBadRequestException(Exception e) {
	    return MessageDTO.builder()
	    		.code("-1")
	    		.message(e.getMessage())
	    		.build();
	}
}
