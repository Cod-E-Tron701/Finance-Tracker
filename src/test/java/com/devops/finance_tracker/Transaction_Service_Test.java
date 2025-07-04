package com.devops.finance_tracker;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
class Transaction_Service_Test {

    private Transaction_Service service;
    private Transaction_Repository repository;

    @BeforeEach
    void setUp() {
        repository = mock(Transaction_Repository.class);
        service = new Transaction_Service(repository);
    }
    @Test
    void testTotalIncomeCalculation() {
        Transaction t1 = new Transaction();
        t1.setAmount(1000);
        t1.setType("Income");
        t1.setDate(LocalDate.now());

        Transaction t2 = new Transaction();
        t2.setAmount(500);
        t2.setType("Income");
        t2.setDate(LocalDate.now());

        when(repository.findAll()).thenReturn(Arrays.asList(t1, t2));

        double result = service.getTotal("Income");
        assertEquals(1500, result);
    }

    @Test
    void testBalanceCalculation() {
        Transaction t1 = new Transaction();
        t1.setAmount(2000);
        t1.setType("Income");

        Transaction t2 = new Transaction();
        t2.setAmount(500);
        t2.setType("Expense");

        when(repository.findAll()).thenReturn(List.of(t1, t2));

        double balance = service.getBalance();
        assertEquals(1500, balance);
    }

    @Test
    void testNoTransactions() {
        when(repository.findAll()).thenReturn(List.of());
        assertEquals(0, service.getBalance());
        assertEquals(0, service.getTotal("Income"));
    }
}
