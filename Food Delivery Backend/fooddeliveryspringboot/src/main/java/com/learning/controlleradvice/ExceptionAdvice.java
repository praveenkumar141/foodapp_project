package com.learning.controlleradvice;

import java.util.HashMap;

import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.learning.exception.AlreadyExistsException;
import com.learning.exception.FoodTypeNotFoundException;
import com.learning.exception.IdNotFoundException;
import com.learning.exception.apierror.ApiError;


@ControllerAdvice
public class ExceptionAdvice extends ResponseEntityExceptionHandler{

	@ExceptionHandler(AlreadyExistsException.class)
	public ResponseEntity<?> alreadyRecordExistsExceptionHandler() {

		HashMap<String, String> map = new HashMap<String, String>();
		map.put("Message", "Record Already Exists");
		return ResponseEntity.badRequest().body(map);
	}

	@ExceptionHandler(IdNotFoundException.class)
	public ResponseEntity<?> idNotFoundExceptionHandler(IdNotFoundException e) {

		HashMap<String, String> map = new HashMap<String, String>();
		map.put("Message", e.getMessage());
		return ResponseEntity.badRequest().body(map);
	}

	@ExceptionHandler(FoodTypeNotFoundException.class)
	public ResponseEntity<?> foodTypeNotFoundException(FoodTypeNotFoundException e) {
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("Message", e.getMessage());
		return ResponseEntity.badRequest().body(map);
	}

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {

		ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
		apiError.setMessage("Validation Error");
		apiError.addValidationErrors(ex.getBindingResult().getFieldErrors()); // We are retrieving all field wise errors
																				// here
		apiError.addValidationError(ex.getBindingResult().getGlobalErrors()); // We are retrieving all global/object
																				// errors here

		return buildResponseEntity(apiError);
	}

	private ResponseEntity<Object> buildResponseEntity(ApiError apiError) {

		// To get responseEntity Object ===> If we want any changes in existing object,
		// then in every return we have to do the change
		// Instead of that, if we use buildResponseEntity method ===> We achieve ease of
		// maintenance
		return new ResponseEntity<>(apiError, apiError.getHttpStatus());
	}

	@ExceptionHandler(ConstraintViolationException.class)
	protected ResponseEntity<?> handleConstraintViolation() {
		return null;
	}

}
