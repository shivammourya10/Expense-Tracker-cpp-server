#include "expense_tracker.h"
#include "httplib.h"
#include <iostream>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

// Instance of ExpenseTracker
ExpenseTracker tracker;

// Route handler for adding an expense
void handle_add_expense(const httplib::Request& req, httplib::Response& res) {
    try {
        auto data = json::parse(req.body);
        std::string category = data["category"];
        double amount = data["amount"];
        tracker.addExpense(category, amount);
        res.set_header("Access-Control-Allow-Origin", "*"); // Add CORS header
        res.set_content("Expense added successfully", "text/plain");
    } catch (const std::exception& e) {
        res.status = 400;
        res.set_header("Access-Control-Allow-Origin", "*"); // Add CORS header
        res.set_content(e.what(), "text/plain");
    }
}

// Route handler for getting the summary
void handle_get_summary(const httplib::Request& req, httplib::Response& res) {
    json summary = tracker.getSummary();
    res.set_header("Access-Control-Allow-Origin", "*"); // Add CORS header
    res.set_content(summary.dump(), "application/json");
}

int main() {
    httplib::Server svr;

    // Handle preflight (OPTIONS) requests for CORS
    svr.Options(".*", [](const httplib::Request&, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
        res.status = 204; // No Content
    });

    // Register routes
    svr.Post("/api/add-expense", handle_add_expense);
    svr.Get("/api/summary", handle_get_summary);

    std::cout << "Starting server on http://localhost:8080" << std::endl;
    svr.listen("localhost", 8080);
}