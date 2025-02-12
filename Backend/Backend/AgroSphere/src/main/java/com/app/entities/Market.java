package com.app.entities;

import lombok.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class Market extends  BaseEntity
{
    @Column(length = 30, unique = true)
    private String name;
    private String address;
    private String district;
    private String state;

    /*
   // @OneToMany(mappedBy = "market", cascade = CascadeType.ALL)
   // @ToString.Exclude // To avoid circular references in toString()
   // @JoinColumn(name = "market_id")
    @OneToMany(mappedBy = "market",fetch = FetchType.EAGER)
    @ToString.Exclude
    private List<MarketRate> marketRates;

//    @OneToMany
//    @JoinColumn(name = "appointment_id")
//    private  List<Appointment>appointments;
//
//    @OneToMany
//    @JoinColumn(name = "product_id")
//    private  List<Product> products;


   @OneToMany(mappedBy = "market",fetch = FetchType.EAGER)    
    private List<Appointment> appointments;

//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Product> products;

    @OneToMany(mappedBy = "market")
 
    private List<Product> products;
    */
    
    
    
    @OneToMany(mappedBy = "market", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<MarketRate> marketRates;

    @OneToMany(mappedBy = "market", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Appointment> appointments;

    @OneToMany(mappedBy = "market", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Product> products;



}
