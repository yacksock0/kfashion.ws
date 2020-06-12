package io.aetherit.kfashion.ws.exception;

import org.springframework.http.HttpStatus;

public class NotAcceptableIdException extends KfashionException {
    public NotAcceptableIdException(String id) {
        super(ErrorCode.NotAcceptableId, HttpStatus.BAD_REQUEST, "Not acceptable id : " + id);
    }
}
