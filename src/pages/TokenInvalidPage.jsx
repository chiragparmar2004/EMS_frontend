import { Container, Typography, Paper } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material"; // Using an icon for a better visual cue
import Grid from "@mui/material/Grid2";

const TokenInvalidPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ minHeight: "80vh" }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Paper
            elevation={6}
            sx={{
              padding: 5,
              borderRadius: 3,
              textAlign: "center",
              boxShadow: 5,
              backgroundColor: "white",
            }}
          >
            <ErrorOutline
              color="error"
              sx={{ fontSize: 100, marginBottom: 2 }}
            />
            <Typography variant="h2" component="h1" color="error" gutterBottom>
              Token Invalid
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              The password reset token you used is either invalid or has
              expired. Please try again, or contact support if the issue
              persists.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TokenInvalidPage;
