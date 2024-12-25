export interface IColumnDef {
    def: string;
    label: string;
    type: string;
}

export interface ISpendingData<T = Object> extends ISpending {
    id: string;
    data?: T
}

interface ISpending {
    date?: string;
    amount?: string;
    category?: string;
    description?: string;
    actions?: string;
}

export interface ISpendingDialogData {
    id: string;
    date: string;
    amount: number;
    category: string;
    description: string;
    actions: string;
  }