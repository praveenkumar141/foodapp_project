package com.learning.exception.apierror;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;

import org.hibernate.validator.internal.engine.path.PathImpl;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ApiError {
	private HttpStatus httpStatus;

	// Need to mention the date and time at when the error occurred
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
	private LocalDateTime timeStamp;

	private String message; // To provide error message details
	private String debugMessage;

	private List<ApiSubError> subErrors; // To hold validation related errors

	private ApiError() {
		timeStamp = LocalDateTime.now(); // @ the time of calling the method, the date time value at that time will be
											// provided
	}

	public ApiError(HttpStatus status) {
		this();
		this.httpStatus = status;
	}

	public ApiError(HttpStatus status, String message, Throwable ex) {
		this();
		this.httpStatus = status;
		this.message = message;
		this.debugMessage = ex.getLocalizedMessage();
	}

	// Every field validation in subErrors
	// Create and add it into subErrors

	private void addSubError(ApiSubError apiSubError) {

		if (subErrors == null) {
			subErrors = new ArrayList<ApiSubError>();
		}
		subErrors.add(apiSubError);
	}

	private void addValidationError(String object, String field, Object rejectedValue, String message) {
		addSubError(new ApiValidationError(object, field, rejectedValue, message));
	}

	private void addValidationError(String object, String message) {
		addSubError(new ApiValidationError(object, message));
	}

	// Encapsulated a field error, that is, a reason for rejecting a specific field
	// value
	private void addValidationError(FieldError fieldError) {

		this.addValidationError(fieldError.getObjectName(), fieldError.getField(), fieldError.getRejectedValue(),
				fieldError.getDefaultMessage());
	}

	public void addValidationErrors(List<FieldError> fieldErrors) {
//		fieldErrors.forEach(this::addValidationError);		Better from developer's POV
		fieldErrors.forEach(e -> this.addValidationError(e));
	}

	private void addValidationError(ObjectError objectError) {

		this.addValidationError(objectError.getObjectName(), objectError.getDefaultMessage());
	}

	public void addValidationError(List<ObjectError> globalErrors) {
		globalErrors.forEach(e -> this.addValidationError(e));
	}

	public void addValidationError(ConstraintViolation<?> cv) {

		this.addValidationError(cv.getRootBeanClass().getName(),
				((PathImpl) cv.getPropertyPath()).getLeafNode().asString(), cv.getInvalidValue(), cv.getMessage());
	}

	public void addValidationsErrors(Set<ConstraintViolation<?>> constrainViolations) {
		constrainViolations.forEach(e -> addValidationError(e));
	}
}
