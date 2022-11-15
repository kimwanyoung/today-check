package main.exception;

@SuppressWarnings("serial")
public class NotAuthorizationException extends RuntimeException{
	public NotAuthorizationException() {
		
	}
	
	public NotAuthorizationException(String message) {
		super(message);
	}
}
