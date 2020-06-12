package io.aetherit.kfashion.ws.exception;

import org.springframework.http.HttpStatus;

public class KfashionException extends RuntimeException {
    private ErrorCode code;
    private HttpStatus status;
    
    public KfashionException(ErrorCode code, HttpStatus status, String message) {
        super(message);
        
        this.code = code;
        this.status = status;
    }
    
    public ErrorCode getErrorCode() {
        return this.code;
    }

    public HttpStatus getStatus() {
        return this.status;
    }
}