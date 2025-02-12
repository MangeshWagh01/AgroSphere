package com.app.service;

import java.util.List;

import com.app.entities.Appointment;

public interface AppointmentService {

	List<Appointment> getAppointments();

	String addAppointment(Appointment appointment);

	String deleteAppointment(Long appointmentId);

	Appointment getAppointmentById(Long appointmentId);

    Appointment updateAppointmentStatus(Long appointmentId, String status);

	List<Appointment> getAppointmentsForFarmer(Long id);

	List<Appointment> findByMarketIdAndProductId(Long marketId, Long productId);
}
