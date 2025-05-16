export const getCategories = (req, res) => {
    const incomeCategories = ["Incomes"];
    const expenseCategories = [
    "Main expenses",
    "Products",
    "Car",
    "Self care",
    "Child care",
    "Household products",
    "Education",
    "Leisure",
    "Other expenses",
    "Entertainment"
    ];

    res.json({
    income: incomeCategories,
    expense: expenseCategories
    });
};

