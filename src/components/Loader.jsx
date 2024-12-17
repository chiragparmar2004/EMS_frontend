import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="500px"
      width="500px"
    >
      <CircularProgress size={30} />
    </Box>
  );
};

export default Loader;
