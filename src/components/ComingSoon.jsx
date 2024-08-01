// @mui
import { Box, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import Page from "./Page";
// assets

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));
export default function ComingSoon() {
  return (
    <Page
      title="Coming Soon"
      sx={{
        height: 1,
      }}>
      <RootStyle>
        <Container>
          <Box
            sx={{
              maxWidth: 480,
              margin: "auto",
              textAlign: "center",
            }}>
            <Typography variant="h3" paragraph>
              Coming Soon!
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
              }}>
              We are currently working hard on this page!
            </Typography>
            <img
              style={{ maxWidth: "100%" }}
              src="images/comingsoon.png"
              alt="comming soon"
            />
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
