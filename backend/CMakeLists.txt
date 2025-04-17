cmake_minimum_required(VERSION 3.10)
project(ExpenseTracker)

set(CMAKE_CXX_STANDARD 17)

# Add cpp-httplib and nlohmann/json as submodules or include them directly
add_executable(expense_tracker main.cpp expense_tracker.cpp)

# Link libraries if needed
target_include_directories(expense_tracker PRIVATE ${CMAKE_SOURCE_DIR}/include)
