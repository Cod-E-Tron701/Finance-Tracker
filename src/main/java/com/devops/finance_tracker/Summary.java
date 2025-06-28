package com.devops.finance_tracker;

public class Summary {
    private double totalIncome;
    private double totalExpense;
    private double balance;

    public Summary(double income, double expense, double balance) {
        this.totalIncome = income;
        this.totalExpense = expense;
        this.balance = balance;
    }

    public double getTotalIncome() { return totalIncome; }
    public double getTotalExpense() { return totalExpense; }
    public double getBalance() { return balance; }
}