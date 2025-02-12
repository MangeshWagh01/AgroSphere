package com.app.service;

import com.app.entities.Market;

import java.util.List;
import java.util.Optional;

public interface MarketService 
{

	List<Market> getAllMarket();

	String addMarket(Market obj);

	String deleteMarket(Long id);

	String editMarket(Long id, Market obj);

	Market getMarket(Long id);

    

}
