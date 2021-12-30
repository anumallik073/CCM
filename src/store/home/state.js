export default function () {
  return {
    catalogsTableData: {
      columns: [
        { id: "0", name: "img", label: "Logo", field: "img", align: "left" },
        { id: "1", name: "catalogName", label: "Catalog Name", field: "catalogName", align: "left" },
        { id: "2", name: "noOfProduct", label: "Number of Products", field: "noOfProduct", align: "center" },
        { id: "3", name: "feedUpdated", label: "Feed Updated", field: "feedUpdated", align: "center" },
        { id: "4", name: "inventoryUpdated", label: "Inventory Updated", field: "inventoryUpdated", align: "center" },
        { id: "5", name: "newFeedAvailable", label: "New Feed Available", field: "newFeedAvailable", align: "center" },
      ],
      rows: [
        { id: "0", img: "Img Here", catalogName: "Adar", noOfProduct: 12, feedUpdated: true, inventoryUpdated: false, newFeedAvailable: true },
        { id: "1", img: "Img Here", catalogName: "Cutieful", noOfProduct: 12, feedUpdated: true, inventoryUpdated: false, newFeedAvailable: true },
        { id: "2", img: "Img Here", catalogName: "Cherokee", noOfProduct: 12, feedUpdated: true, inventoryUpdated: false, newFeedAvailable: true },
        { id: "3", img: "Img Here", catalogName: "Dimar", noOfProduct: 12, feedUpdated: true, inventoryUpdated: false, newFeedAvailable: true },
        { id: "4", img: "Img Here", catalogName: "Adar", noOfProduct: 12, feedUpdated: true, inventoryUpdated: false, newFeedAvailable: true },
        { id: "5", img: "Img Here", catalogName: "Adar", noOfProduct: 12, feedUpdated: true, inventoryUpdated: false, newFeedAvailable: true },
        { id: "6", img: "Img Here", catalogName: "Adar", noOfProduct: 12, feedUpdated: true, inventoryUpdated: false, newFeedAvailable: true },
        { id: "7", img: "Img Here", catalogName: "Adar", noOfProduct: 12, feedUpdated: true, inventoryUpdated: false, newFeedAvailable: true },
        { id: "8", img: "Img Here", catalogName: "Adar", noOfProduct: 12, feedUpdated: true, inventoryUpdated: false, newFeedAvailable: true },
        { id: "9", img: "Img Here", catalogName: "Adar", noOfProduct: 12, feedUpdated: true, inventoryUpdated: false, newFeedAvailable: true }
      ],
    },
  }
}
