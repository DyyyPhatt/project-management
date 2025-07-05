export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200";

export const dataGridSxStyles = (isDarkMode: boolean) => ({
  color: isDarkMode ? "#e5e7eb" : "#1f2937",
  backgroundColor: isDarkMode ? "#111827" : "#ffffff",
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: isDarkMode ? "#1f2937" : "#f9fafb",
    color: isDarkMode ? "#e5e7eb" : "#111827",
    borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
  },
  "& .MuiDataGrid-cell": {
    borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
  },
  "& .MuiDataGrid-row": {
    backgroundColor: isDarkMode ? "#111827" : "#ffffff",
    "&:hover": {
      backgroundColor: isDarkMode ? "#1f2937" : "#f3f4f6",
    },
  },
  "& .MuiTablePagination-root": {
    color: isDarkMode ? "#a3a3a3" : "#4b5563",
  },
  "& .MuiSvgIcon-root": {
    color: isDarkMode ? "#a3a3a3" : "#6b7280",
  },
});

// export const dataGridSxStyles = (isDarkMode: boolean) => {
//   return {
//     "& .MuiDataGrid-columnHeaders": {
//       color: `${isDarkMode ? "#e5e7eb" : "#1f2937"}`,
//       '& [role="row"] > *': {
//         backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
//         borderColor: `${isDarkMode ? "#2d3135" : ""}`,
//       },
//     },
//     "& .MuiIconbutton-root": {
//       color: `${isDarkMode ? "#a3a3a3" : ""}`,
//     },
//     "& .MuiTablePagination-root": {
//       color: `${isDarkMode ? "#a3a3a3" : ""}`,
//     },
//     "& .MuiTablePagination-selectIcon": {
//       color: `${isDarkMode ? "#a3a3a3" : ""}`,
//     },
//     "& .MuiDataGrid-cell": {
//       border: "none",
//     },
//     "& .MuiDataGrid-row": {
//       borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "e5e7eb"}`,
//     },
//     "& .MuiDataGrid-withBorderColor": {
//       borderColor: `${isDarkMode ? "#2d3135" : "e5e7eb"}`,
//     },
//   };
// };
