import mainRouter from "src/configs/MainRouter";
import { RouterProvider } from "react-router-dom";
import "./App.css";

function App() {
  return <RouterProvider router={mainRouter} />;
}

export default App;
