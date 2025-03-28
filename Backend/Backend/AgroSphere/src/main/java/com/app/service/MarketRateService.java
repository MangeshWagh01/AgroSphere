package com.app.service;

import java.util.List;

import com.app.entities.MarketRate;

public interface MarketRateService 
{

	List<MarketRate> getAllRates();

	String addRate(MarketRate obj);

	String deleteRate(Long id);

	String updateRate(Long id, MarketRate obj);

	
}
