/*
export function someMutation (state) {
}
*/

export const storeCatalogs = (state,payload) => {
    state.catalogsTableData.rows = (payload)
 }
