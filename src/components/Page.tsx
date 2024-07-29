import { forwardRef } from "react";
import { Helmet } from "react-helmet";
// @mui
import { Box, BoxProps } from "@mui/material";

// ----------------------------------------------------------------------

interface PageProps extends BoxProps {
  children: React.ReactNode;
  title: string;
}

const Page = forwardRef(
  ({ children, title = "", ...other }: PageProps, ref) => {
    return (
      <>
        <Helmet>
          <title> {`${title}`} </title>
        </Helmet>
        <Box ref={ref} {...other}>
          {children}
        </Box>
      </>
    );
  }
);

Page.displayName = "Page";

export default Page;
