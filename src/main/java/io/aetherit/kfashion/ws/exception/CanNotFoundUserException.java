package io.aetherit.kfashion.ws.exception;

import org.springframework.http.HttpStatus;

public class CanNotFoundUserException extends KfashionException {
    public CanNotFoundUserException() {
        super(ErrorCode.CanNotFoundUser, HttpStatus.BAD_REQUEST, "Can not found user");
    }

    public CanNotFoundUserException(String id) {
        super(ErrorCode.CanNotFoundUser, HttpStatus.BAD_REQUEST, "Can not found user : " + id);
    }
}
