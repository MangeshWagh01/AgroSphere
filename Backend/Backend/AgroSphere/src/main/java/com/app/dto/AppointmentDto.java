package com.app.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class AppointmentDto {
	 private String status;
	    private Long id;

	    // Constructor with parameters (for deserialization)
	    @JsonCreator
	    public AppointmentDto(@JsonProperty("status") String status, @JsonProperty("appointmentId") Long appointmentId) {
	        this.status = status;
	        this.id = id;
	    }

}
