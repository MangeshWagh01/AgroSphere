package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AppointmentEntityDao;
import com.app.entities.Appointment;
@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService{
	@Autowired
	AppointmentEntityDao appointmentEntityDao;
	
	@Override
	public List<Appointment> getAppointments() {	
		return appointmentEntityDao.findAll();	
	}	

	@Override 
	public String addAppointment(Appointment appointment) {
		appointmentEntityDao.save(appointment);    
        return "Appointment added successfully";	
	}
	
	@Override
    public String deleteAppointment(Long appointmentId) {
		if(appointmentEntityDao.existsById(appointmentId)) {
            appointmentEntityDao.deleteById(appointmentId);
            return "Appointment deleted successfully";
        } else {
            return "Appointment not found";   }
	}
	
	@Override
    public Appointment getAppointmentById(Long appointmentId) {
        return appointmentEntityDao.findById(appointmentId).orElse(null);
    }	
	
//	@Override
//    //confirm an appointment
//    public Appointment confirmAppointment(Long id) {
//       
//        Appointment appointment = appointmentEntityDao.findById(id).orElse(null);
//
//        if (appointment == null) {
//            return null; // Appointment not found
//        }
//
//        // Set the status to 'Confirmed' (or any other status you want)
//        appointment.setStatus("Confirmed");
//        // Update the appointment in the database
//        return appointmentEntityDao.save(appointment);
//    }

//	@Override
//    //cancel an appointment
//    public Appointment cancelAppointment(Long id) {
//        Appointment appointment = appointmentEntityDao.findById(id).orElse(null);
//
//        if (appointment == null) {
//            return null;
//        }
//
//        // Set the status to 'Canceled' (or any other status you want)
//        appointment.setStatus("Canceled");
//        // Update the appointment in the database
//        return appointmentEntityDao.save(appointment);
//    }

	@Override
	public Appointment updateAppointmentStatus(Long appointmentId, String status) {
	    Appointment appointment = appointmentEntityDao.findById(appointmentId).orElse(null);
	    if (appointment == null) {
	        return null; // Appointment not found
	    }

	    // Validate status (Optional: you can add specific validation for status values)
	    if (!"Accepted".equals(status) && !"Rejected".equals(status)) {
	        return null; // Invalid status
	    }

	    // Update the status
	    appointment.setStatus(status);
	    return appointmentEntityDao.save(appointment); // Save the updated appointment
	}
	
	@Override
	public List<Appointment> getAppointmentsForFarmer(Long id) {
	    return appointmentEntityDao.findByFarmerId(id);
	}
	
	@Override
	 public List<Appointment> findByMarketIdAndProductId(Long marketId, Long productId) {

	  return appointmentEntityDao.findByMarketAndProduct(marketId,productId);
	 }
}
