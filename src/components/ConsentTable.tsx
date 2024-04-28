import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { getConsentHeaders } from "../api/abha-api";
import { useDispatch, useSelector } from "react-redux";
import { ConsentHeaders } from "../redux/reducer";
interface Column {
  id:
    | "patientIdentifier"
    | "requestStatus"
    | "consentDate"
    | "consentGranted"
    | "consentExpiry"
    | "view";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "patientIdentifier", label: "ABHA Address", minWidth: 100 },
  {
    id: "requestStatus",
    label: "Request Status",
    minWidth: 100,
    format: (value: number) => value.toLocaleString("en-US"),
  },

  {
    id: "consentDate",
    label: "Consent Date",
    minWidth: 100,
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "consentGranted",
    label: "Consent Granted",
    minWidth: 100,

    format: (value: number) => value.toFixed(2),
  },
  {
    id: "consentExpiry",
    label: "Consent Expiry",
    minWidth: 100,

    format: (value: number) => value.toFixed(2),
  },

  {
    id: "view",
    label: "View",
    minWidth: 100,

    format: (value: number) => value.toFixed(2),
  },
];

//interface RootState {
//getConsentHeaderData: Array<T>;
//}

export default function ConsentTable() {
  const initialState = {
    dateFrom: null,
    dateTo: null,
  };

  type RootState = {
    getConsentHeaderData: ConsentHeaders[];
  };
  const consentHeaderList = useSelector(
    (state: RootState) => state.getConsentHeaderData
  );
  console.log(consentHeaderList);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [state, setState] = React.useState(initialState);
  const [progress, setProgress] = React.useState(false);
  const { dateFrom, dateTo } = state;
  const dispatch = useDispatch();
  const handleConsentSearch = async (fromDate: null, toDate: null) => {
    setProgress(true);
    const result = await getConsentHeaders(
      "IN1410000152",
      fromDate,
      toDate,
      dispatch
    );
    console.log(result);
  };
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const handleDateFrom = (date: null) => {
    setState({
      ...state,
      dateFrom: date,
    });
  };
  const handleDateTo = (date: null) => {
    setState({
      ...state,
      dateTo: date,
    });
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper
        sx={{
          border: "2px solid #000",
          boxShadow: 24,
          borderWidth: 1,
          borderColor: "#BDBDBD",
          mt: 2,
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow sx={{ borderBottom: 1 }}>
                <TableCell colSpan={3} sx={{ fontSize: "1.2rem" }}>
                  CONSENT LIST
                </TableCell>
                <TableCell align="right" colSpan={6}>
                  <Box
                    sx={{
                      height: "100%",
                      borderRadius: 2,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: 4,
                    }}
                  >
                    <Box
                      sx={{
                        display: "inline-flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
                        Health Info From Date
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={state.dateFrom}
                          onChange={handleDateFrom}
                          slotProps={{ textField: { variant: "outlined" } }}
                        />
                      </LocalizationProvider>
                    </Box>
                    <Box
                      sx={{
                        display: "inline-flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography variant="h2" sx={{ fontSize: "0.9rem" }}>
                        Health Info To Date
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          value={state.dateTo}
                          onChange={handleDateTo}
                          slotProps={{ textField: { variant: "outlined" } }}
                        />
                      </LocalizationProvider>
                    </Box>
                    <IconButton
                      onClick={() => handleConsentSearch(dateFrom, dateTo)}
                    >
                      <SearchIcon sx={{ cursor: "pointer" }} />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>

              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{ backgroundColor: "#00E676", color: "#fff" }}
                    key={column.id}
                    align="center"
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {consentHeaderList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((consent) => {
                return (
                  <>
                    {progress && (
                      <TableBody>
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={consent.abhaConsentHeaderId}
                        >
                          <TableCell align="center">
                            {consent.healthId}
                          </TableCell>

                          <TableCell align="center">
                            {consent.consentStatus}
                          </TableCell>

                          <TableCell align="center">
                            {consent.fetchFromDate}
                          </TableCell>

                          <TableCell align="center">
                            {consent.fetchToDate}
                          </TableCell>

                          <TableCell align="center">
                            {consent.permissionExpiryDate}
                          </TableCell>

                          <TableCell align="center">
                            <Link to="/viewlist" target="_blank">
                              <IconButton>
                                <ArrowForwardIosIcon
                                  sx={{ color: "#00E676" }}
                                />
                              </IconButton>
                            </Link>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </>
                );
              })}
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          count={consentHeaderList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={() => handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <></>
    </>
  );
}
