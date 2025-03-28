package com.app.entities;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "orders")

public class Order extends BaseEntity {

	
    @ManyToOne
    @JoinColumn(name = "buyer_id", nullable = false)
    private UserEntity buyer;

    @ManyToOne 
    @JoinColumn(name = "farmer_id", nullable = false)
    private UserEntity farmer;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

   
    @ManyToOne
    @JoinColumn(name = "market_id", nullable = false)
    private Market market;

    
    @ManyToOne(cascade = CascadeType.ALL) 
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;
    
    private Double rate;
    private Long quantity;
    private Double totalAmount;

    @CreationTimestamp
    private LocalDateTime orderDate;
}
