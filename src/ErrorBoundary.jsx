import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const DefaultError = () => (
  <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        An unexpected error has occurred :(
      </Typography>
    </CardContent>
    <CardActions>
      <Button component={Link} to="." size="small">Reload Page</Button>
    </CardActions>
  </Card>
);

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(err) {
    return { hasError: true };
  }

  componentDidCatch(err, info) {
    console.log(err, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultError/>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
