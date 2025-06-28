package com.devops.finance_tracker;

import com.devops.finance_tracker.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Transaction_Repository extends JpaRepository<Transaction, Long> {
}