package com.axis.ijp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ComplaintNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	
    public ComplaintNotFoundException(String message) {
        super(message);
    }
}
