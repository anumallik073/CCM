/*
export function someGetter (state) {
}
*/
export const getSuppliersTableColumns = state => state.suppliersTableData.columns;
export const getSuppliersTableRows = state => state.suppliersTableData.rows;

export const getHistoryTableColumns = state => state.historyTableData.columns;
export const getHistoryTableRows = state => state.historyTableData.rows;

export const subscriptionCol = state => state.subscriptionCol;
export const subscriptionRow = state => state.subscriptionRow;
export const subscriptionCat = state => state.industry;