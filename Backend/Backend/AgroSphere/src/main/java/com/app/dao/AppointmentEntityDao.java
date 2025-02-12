package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Appointment;

public interface AppointmentEntityDao extends JpaRepository<Appointment, Long> 
{

	List<Appointment> findByFarmerId(Long id);
	
	@Query("SELECT a from Appointment a where a.market.id = :marketId  AND a.product.id= :prod_id")
	 List<Appointment>findByMarketAndProduct(@Param("marketId") Long marketId, @Param("prod_id") Long productId);
}
