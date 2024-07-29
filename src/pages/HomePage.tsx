import { Link } from "react-router-dom";
import Page from "src/components/Page";
import ERoutePath from "src/types/routes.enum";

const HomePage = () => {
  return (
    <Page title="Trang chủ">
      <h3>Home Page</h3>
      <Link to={ERoutePath.DASHBOARD}>Dashboard</Link>
    </Page>
  );
};

export default HomePage;
