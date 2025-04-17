#include "expense_tracker.h"

void ExpenseTracker::addExpense(const std::string& category, double amount) {
    if (amount <= 0) {
        throw std::invalid_argument("Amount must be greater than zero.");
    }
    expenses[category] += amount;
}

nlohmann::json ExpenseTracker::getSummary() const {
    nlohmann::json summary;
    for (const auto& [category, total] : expenses) {
        summary[category] = total;
    }
    return summary;
}