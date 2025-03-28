package com.app.entities;

import lombok.*;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString


public class MarketRate extends  BaseEntity{

    private  Double rate;

    @ManyToOne
    @JoinColumn(name = "market_id")
    private  Market market;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private  Product product;

    @UpdateTimestamp
    private LocalDate update_on;
    
    private double maxRate;
    private double minRate;
    private double avgRate;

    @Column(name = "created_on")
    private LocalDate createdOn;
}
