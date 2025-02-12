package com.app.dao;

import com.app.entities.Market;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketDao extends JpaRepository<Market, Long>
{
}
