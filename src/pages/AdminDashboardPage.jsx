import { Card, CardContent, Container, Grid, Typography } from "@mui/material";

const AdminDashboardPage = () => {
  return (
    <Container>
      {/* Grid for total employees, active members, and recent members */}
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        {/* Total Employees */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom color="text.contrastText">
                Total Employees
              </Typography>
              <Typography variant="h5" color="primary">
                120
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Active Members */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom color="text.contrastText">
                Active Members
              </Typography>
              <Typography variant="h5" color="primary">
                90
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboardPage;
