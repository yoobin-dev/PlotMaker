package org.ohap.plotmaker.common;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class HandleException {

  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<ApiResponse<String>> handleIllegalArgumentException(IllegalArgumentException e) {
    ApiResponse<String> response = ApiResponse.<String>builder().isSuccess(false).message(e.getMessage()).build();
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }

  @ExceptionHandler(NoSuchElementException.class)
  public ResponseEntity<ApiResponse<String>> handleNoSuchElementException(NoSuchElementException e) {
    ApiResponse<String> response = ApiResponse.<String>builder().isSuccess(false).message(e.getMessage()).build();
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
  }

  // @ExceptionHandler(Exception.class)
  // public ResponseEntity<ApiResponse<String>> handleException(Exception e){
  //   ApiResponse<String> response = ApiResponse.<String>builder().isSuccess(false).message(e.getMessage()).build();
  //   return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
  // }

}

