export default function () {
  return {
    usersTableData: {
      roleOptions: ["Viewer", "Admin", "Editor", "Billing"],
      columns: [
        { id: "0", name: "userName", required: true, label: "Username", align: "left", sortable: true, },
        { id: "1", name: "name", required: true, label: "Name", align: "left", sortable: true, },
        { id: "2", name: "email", align: "center", label: "Email", field: "email", sortable: true, },
        { id: "3", name: "role", label: "Role", field: "role", sortable: true },
        { id: "4", name: "status", label: "Status", field: "status", sortable: true },
        // { id: "4", name: "genPass", label: "Generate Password", field: "genPass" },
        { id: "5", name: "delete", label: "Delete", field: "deleted", align: "center" },
      ],
      rows:[],
     
    },
    rolesTableData: {
      pages: [],
      status: false,
      columns: [
        { id: "0", name: "id", label: "ID", align: "left", sortable: true, },
        { id: "1", name: "name", required: true, label: "Role Name", align: "left", sortable: true, },
        { id: "2", name: "selectedPages", align: "center", label: "Pages Accessible", field: "selectedPages", sortable: true, },
        { id: "3", name: "createdBy", label: "CreatedBy", field: "createdBy", sortable: true },
        { id: "4", name: "status", label: "Status", field: "status", sortable: true },
        { id: "5", name: "deleted", label: "Delete", field: "deleted" },
      ],
      rows: []
    },
    apiDetails:[
      { id: 0, title: "Get Products", apiname: "https://ccm.sellerscommerce.com/api/getproducts" },
      { id: 0, title: "Get Skus", apiname: "https://ccm.sellerscommerce.com/api/getskus" },
      { id: 0, title: "Get Product Details", apiname: "https://ccm.sellerscommerce.com/api/getproductDetails" },
      { id: 0, title: "Get Suppliers", apiname: "https://ccm.sellerscommerce.com/api/getsuppliers" },
      { id: 0, title: "Get Rows", apiname: "https://ccm.sellerscommerce.com/api/getrows" },
      { id: 0, title: "Get Files", apiname: "https://ccm.sellerscommerce.com/api/getfiles" },
    ],
    FTPTime : ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", 
    "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00",
    "22:00", "23:00", "24:00"]
  }
}