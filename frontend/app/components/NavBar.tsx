import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router";

export default function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Programming in Depth
        </Typography>

        <Box>
          <Button color="inherit" component={Link} to="/articles">
            Articles
          </Button>
          <Button color="inherit" component={Link} to="/notes">
            Notes
          </Button>
          <Button color="inherit" component={Link} to="/quiz">
            Quiz
          </Button>
          <Button color="inherit" component={Link} to="/news">
            News
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
