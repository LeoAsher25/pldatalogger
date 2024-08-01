import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ComingSoon from "src/components/ComingSoon";
import RealtimeDataPage from "src/pages/RealtimeDataPage";
import Sample from "src/pages/Sample";
import SersorDataPage from "src/pages/SersorDataPage";
import { mainNavigation } from "./data";
import AuthGuard from "./guards/AuthGuard";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import ERoutePath from "./types/routes.enum";

const App = () => {
  const appliedTheme = createTheme();
  return (
    <BrowserRouter>
      <ThemeProvider theme={appliedTheme}>
        <Routes>
          <Route path={ERoutePath.LOGIN} element={<Login />} />
          <Route
            path={ERoutePath.HOME_PAGE}
            element={
              <AuthGuard>
                <MainLayout navigationData={mainNavigation} />
              </AuthGuard>
            }>
            <Route
              path={ERoutePath.HOME_PAGE}
              element={<Navigate to={ERoutePath.REALTIME} />}
            />
            <Route path={ERoutePath.REALTIME} element={<RealtimeDataPage />} />
            <Route path={ERoutePath.DATA} element={<SersorDataPage />} />
            <Route path={ERoutePath.CHART} element={<ComingSoon />} />
            <Route path={ERoutePath.TABLE} element={<ComingSoon />} />
            <Route path={ERoutePath.SAMPLE} element={<Sample />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
