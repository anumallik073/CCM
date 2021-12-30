export default function () {
  return {
    suppliersTableData: {
      downloadOptions: ["CSV", "FTP"],
      columns: [
        { id: "0", name: "logo", label: "Logo", field: "logo", sortable: true, align: "left" },
        { id: "1", name: "name", label: "Name", field: "name", sortable: true, align: "left" },
        { id: "2", name: "code", label: "Code", field: "code", sortable: true, align: "center" },
        { id: "3", name: "email", label: "Email", field: "email", sortable: true, align: "center" },
        { id: "4", name: "isInventoryAvailable", label: "Inventory", field: "isInventoryAvailable", sortable: true, align: "center" },
        { id: "5", name: "isDropshipAvailable", label: "Dropship", field: "isDropshipAvailable", align: "center" },
        { id: "6", name: "canDownload", label: "Download", field: "canDownload", align: "center" },
      ],
      rows:[],
    },
    historyTableData: {
      columns: [
        { id: "0", name: "supplier", label: "Supplier", field: "supplier", sortable: true, align: "left" },
        { id: "1", name: "filename", label: "File Name", field: "filename", sortable: true, align: "left" },
        { id: "2", name: "date", label: "Date", field: "date", sortable: true, align: "center" },
        { id: "3", name: "rows", label: "Email", field: "email", sortable: true, align: "center" },
        { id: "4", name: "connection", label: "Connection", field: "connection", sortable: true, align: "center" },
      ],
      rows: [
        {
          id: "0",
          supplier: "Adar",
          filename: "amanda02122022",
          date: "01/01/2022",
          rows: 5,
          connection: "FTP",
        },
        {
          id: "1",
          supplier: "Adar",
          filename: "amanda02122022",
          date: "01/01/2022",
          rows: 5,
          connection: "FTP",
        },
        {
          id: "2",
          supplier: "Cutieful",
          filename: "amanda02122022",
          date: "01/01/2022",
          rows: 12,
          connection: "FTP",
        },
        {
          id: "3",
          supplier: "Adar",
          filename: "amanda02122022",
          date: "01/01/2022",
          rows: 5,
          connection: "FTP",
        },
        {
          id: "4",
          supplier: "Adar",
          filename: "amanda02122022",
          date: "01/01/2022",
          rows: 5,
          connection: "FTP",
        },
        {
          id: "5",
          supplier: "Adar",
          filename: "amanda02122022",
          date: "01/01/2022",
          rows: 5,
          connection: "FTP",
        },
        {
          id: "6",
          supplier: "Adar",
          filename: "amanda02122022",
          date: "01/01/2022",
          rows: 5,
          connection: "FTP",
        },
        {
          id: "7",
          supplier: "Adar",
          filename: "amanda02122022",
          date: "01/01/2022",
          rows: 5,
          connection: "FTP",
        },
        {
          id: "8",
          supplier: "Adar",
          filename: "amanda02122022",
          date: "01/01/2022",
          rows: 5,
          connection: "FTP",
        },
        {
          id: "9",
          supplier: "Adar",
          filename: "amanda02122022",
          date: "01/01/2022",
          rows: 5,
          connection: "FTP",
        },
      ],
    },
    subscriptionCol: [    
      {
        name: 'providerLogo',
        required: true,
        label: 'Logo',
        align: 'left',
        field: row => row.providerLogo,
        format: val => `${val}`,
      },
      { name: 'name', align: 'center', label: 'Supplier Details', field: 'name', sortable: true },
      { name: 'updateTypes', label: 'Updates', field: 'updateTypes', sortable: true },
      { name: 'subscription', label: 'Subscribe', field: 'subscription', sortable: true },
      { name: 'approvalType', label: 'Applroval Type', field: 'approvalType', sortable: true }
    ],
    subscriptionRow: [],
    industry: [
      { id: 1, name: "Uniforms" },
      { id: 2, name: "Promotional" },
      { id: 3, name: "Fasteners" },
      { id: 4, name: "DME" }
    ]
  }
}