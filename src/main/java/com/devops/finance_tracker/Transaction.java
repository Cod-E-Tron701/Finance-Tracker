package com.devops.finance_tracker;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double amount;
    private String type; 
    private String category;
    private LocalDate date;
    public Long getId() 
    { return id; }
    
    public void setId(Long id) 
    { this.id = id; }

    public double getAmount() 
    { return amount; }
    
    public void setAmount(double amount) 
    { this.amount = amount; }

    public String getType() 
    { return type; }
    
    public void setType(String type) 
    { this.type = type; }

    public String getCategory() 
    { return category; }
    
    public void setCategory(String category) 
    { this.category = category; }

    public LocalDate getDate() 
    { return date; }
    
    public void setDate(LocalDate date) 
    { this.date = date; }
}