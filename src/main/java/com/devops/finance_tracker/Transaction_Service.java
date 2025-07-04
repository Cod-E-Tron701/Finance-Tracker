package com.devops.finance_tracker;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class Transaction_Service {

    private final Transaction_Repository repository;

    public Transaction_Service(Transaction_Repository repository) {
        this.repository = repository;
    }

    public Transaction addTransaction(Transaction t) {
        return repository.save(t);
    }

    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    public double getTotal(String type) {
        return repository.findAll().stream()
                .filter(t -> t.getType().equalsIgnoreCase(type))
                .mapToDouble(Transaction::getAmount)
                .sum();
    }

    public double getBalance() {
        return getTotal("income") - getTotal("expense");
    }

    public void clearAll() {
        repository.deleteAll();
    }
}

