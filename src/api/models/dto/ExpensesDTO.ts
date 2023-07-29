export interface ExpensesDTO {
    id?: number;    
	application_id?: number;
	category_id?: number;
	period_id?: number;
	description?: string;
	amount?: number;
}

export interface ExpenseCategoryDTO {
    id?: number;
	report_expense_category_id?: number;
	description?: string;
	is_active?: boolean;
	notes?: string;
	is_required?: boolean;
}

export interface UncappedExpensesDTO {
    id?: number;    
	application_id?: number;
	period_id?: number;
	description?: string;
	amount?: number;
    category?: string;
    notes?: string;
}