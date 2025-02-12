package com.app.dao;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.MarketRate;

public interface MarketRateDao extends JpaRepository<MarketRate, Long>
{
	@Query("SELECT mr.rate FROM MarketRate mr WHERE mr.market.id = :marketId AND mr.product.id = :productId AND mr.createdOn = :date")
	 List<Double> findRatesByMarketProductAndDate(@Param("marketId") Long marketId, @Param("productId") Long productId, @Param("date") LocalDate date);

	 Optional<MarketRate> findByMarketIdAndProductIdAndCreatedOn(Long marketId, Long productId, LocalDate createdOn);
}
