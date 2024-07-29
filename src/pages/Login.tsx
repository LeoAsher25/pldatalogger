import { Box, Card, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import LoginForm from "src/components/login/LoginForm";
import Page from "src/components/Page";
import useResponsive from "src/hooks/useResponsive";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  const mdUp = useResponsive("up", "md");

  return (
    <Page title="Đăng nhập">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Typography
              variant="h3"
              sx={{
                px: 5,
                mt: 10,
                mb: 5,
              }}>
              {"EV-24 SmartConfig"}
            </Typography>
          </SectionStyle>
        )}
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                mb: 5,
              }}>
              <Box
                sx={{
                  flexGrow: 1,
                }}>
                <Typography variant="h4" gutterBottom>
                  ĐĂNG NHẬP HỆ THỐNG
                </Typography>
                <Typography
                  sx={{
                    color: "text.secondary",
                  }}>
                  Nhập thông tin của bạn.
                </Typography>
              </Box>
            </Stack>
            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
