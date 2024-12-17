import InfiniteScroll from "react-infinite-scroll-component";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const DashboardTable = ({
  data = [],
  columns = [],
  title = "",
  loading = false,
  hasMore = false,
  fetchMoreData,
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      {title && (
        <Box
          color="primary.contrastText"
          textAlign="center"
          sx={{ marginBottom: 2 }}
        >
          <Typography variant="h6" fontWeight="bold">
            {title}
          </Typography>
        </Box>
      )}

      {loading && data.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      ) : !data.length ? (
        <Box
          p={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <Typography variant="h6" color="textSecondary">
            No data found
          </Typography>
        </Box>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress size={24} />
            </Box>
          }
          height={400} // Define the scrollable area here
          style={{ overflow: "auto" }}
          endMessage={
            <Box textAlign="center" my={2}>
              <Typography variant="body2" color="textSecondary">
                No more data to load
              </Typography>
            </Box>
          }
        >
          <TableContainer>
            <Table stickyHeader aria-label="infinite scroll table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        bgcolor: "primary.main",
                        color: "text.contrastText",
                        minWidth: column.width || "150px",
                        ...(theme.breakpoints.down("sm") && {
                          fontSize: "0.875rem",
                          padding: "8px 16px",
                        }),
                      }}
                    >
                      {column.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    {columns.map((column) => {
                      const cellValue = column.render
                        ? column.render(row[column.field], row)
                        : row[column.field];

                      return (
                        <TableCell
                          key={column.field}
                          sx={{ textAlign: "center" }}
                          title={cellValue}
                        >
                          {cellValue}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </InfiniteScroll>
      )}
    </Paper>
  );
};

export default DashboardTable;
