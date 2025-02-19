import React from "react";
import { NoSsr } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <NoSsr>
      <head>
        <title>{title}</title>
      </head>
      <Grid container spacing={3}>
        <Grid flex={1} sx={{ marginTop: 2 }}>
          {children}
        </Grid>
      </Grid>
    </NoSsr>
  );
};

export default Layout;
