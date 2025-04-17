#ifndef EXPENSE_TRACKER_H
#define EXPENSE_TRACKER_H

#include <string>
#include <map>
#include <nlohmann/json.hpp>

class ExpenseTracker {
public:
    void addExpense(const std::string& category, double amount);
    nlohmann::json getSummary() const;

private:
    std::map<std::string, double> expenses;
};

#endif // EXPENSE_TRACKER_H