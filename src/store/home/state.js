export default function () {
  return {
    catalogsTableData: {
      columns: [
        { id: "0", name: "img", label: "Logo", field: "img", sortable: true, align: "left" },
        { id: "1", name: "catalogName", label: "Catalog Name", field: "catalogName", sortable: true, align: "left" },
        { id: "2", name: "noOfProduct", label: "Number of Products", field: "noOfProduct", sortable: true, align: "center" },
        { id: "3", name: "feedUpdated", label: "Feed Updated", field: "feedUpdated", sortable: true, align: "center" },
        { id: "4", name: "inventoryUpdated", label: "Inventory Updated", field: "inventoryUpdated", sortable: true, align: "center" },
        { id: "5", name: "newFeedAvailable", label: "New Feed Available", field: "newFeedAvailable", align: "center" },
      ],
      rows:[],
    },
  }
}
