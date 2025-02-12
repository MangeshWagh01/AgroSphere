package com.app.dto;

import lombok.*;

@Setter
@Getter

public class OrderRequestdDto 
{
	
	
    private Long buyerId;
    private Long productId;
    private Long marketId;
    private Long appointmentId;
    private Long quantity;
    private Double rate;
    

}
