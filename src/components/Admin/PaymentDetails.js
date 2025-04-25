import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbarExport } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const PaymentDetails = ({ paymentData }) => {
  const allowedKeys = [
    "id",
    "entity",
    "amount",
    "currency",
    "status",
    "method",
    "captured",
    "description",
    "card_last4",
    "card_network",
    "card_type",
    "email",
    "contact",
    "created_at",
  ];

  const setHeaderName = (key) => {
    const headers = {
      id: "Payment ID",
      entity: "Type",
      amount: "Amount",
      currency: "Currency",
      status: "Status",
      method: "Payment Mode",
      captured: "Capture",
      description: "Description",
      card_last4: "Card Last Digits",
      card_network: "Card Network",
      card_type: "Card Type",
      email: "Email",
      contact: "Contact",
      created_at: "Created Date",
    };
    return headers[key] || key;
  };

  const columns = allowedKeys.map((key) => {
    const columnConfig = {
      field: key,
      headerName: setHeaderName(key),
      flex: 1,
      headerClassName: "grid-header-style",
      renderHeader: (params) => (
        <span style={{ fontWeight: "bold" }}>{params.colDef.headerName}</span>
      ),
    };

    // Remove specific width restrictions and use flex to adjust based on content
    columnConfig.minWidth = 150; // Set a minimum width for better readability

    return columnConfig;
  });

  //   const CustomToolbar = () => (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "flex-end",
  //         gap: 1,
  //         marginTop: "-16px",
  //         paddingBottom: "10px",
  //         marginRight: "8px",
  //       }}
  //     >
  //       <GridToolbarExport />
  //     </Box>
  //   );

  const MyCustomNoRowsOverlay = () => <div>No Data Found</div>;

  return (
    <div>
      <DataGrid
        rows={paymentData}
        disableRowSelectionOnClick
        columns={columns}
        density="compact"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{
          noRowsOverlay: MyCustomNoRowsOverlay,
          //   toolbar: CustomToolbar,
        }}
        style={{ height: "400px", width: "100%" }} // Full width for the grid
        pageSizeOptions={[5, 10, 25]}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            borderRadius: 0,
          },
          "& .grid-header-style": {
            backgroundColor: "#ccc",
            textTransform: "capitalize",
          },
          "& .MuiDataGrid-row": {
            borderTopColor: "#ccc",
            borderTopStyle: "solid",
            "&:hover": {
              backgroundColor: "#ecf2ff",
              color: "#7784d6",
            },
          },
          //   "& .MuiDataGrid-scrollArea": {
          //     "&::-webkit-scrollbar": {
          //       width: "2px", // Thinner scrollbar
          //     },
          // "&::-webkit-scrollbar-thumb": {
          //   backgroundColor: "#888", // Scrollbar color
          //   borderRadius: "10px",
          //   //   width: "5px
          // },
          // "&::-webkit-scrollbar-thumb:hover": {
          //   backgroundColor: "#555", // Hover color for scrollbar
          //   //   width: "5px",
          // },
          //   },
        }}
      />
    </div>
  );
};

export default PaymentDetails;
