package com.devops.finance_tracker;

import com.devops.finance_tracker.Summary;
import com.devops.finance_tracker.Transaction;
import com.devops.finance_tracker.Transaction_Service;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/transactions")
public class Transaction_Controller {

    private final Transaction_Service service;

    public Transaction_Controller(Transaction_Service service) {
        this.service = service;
    }

    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction t) {
        return service.addTransaction(t);
    }

    @GetMapping
    public List<Transaction> getAll() {
        return service.getAllTransactions();
    }

    @GetMapping("/summary")
    public Summary getSummary() {
        double income = service.getTotal("income");
        double expense = service.getTotal("expense");
        double balance = service.getBalance();
        return new Summary(income, expense, balance);
    }
}