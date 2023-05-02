import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "tss-react/mui";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import router from "./router";

const useStyles = makeStyles()(() => {
  return {
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  };
});
function App() {
  const { classes } = useStyles();

  return (
    // <BrowserRouter>
    //     <Header />
    //     <Routes>
    //       <Route path="/" Component={Homepage} exact />
    //       <Route path="/coins/:id" Component={CoinPage} />
    //       <Route path="/login" Component={Login} />
    //       <Route path="/signup" Component={Signup} />
    //     </Routes>
    // </BrowserRouter>
    <div className={classes.App}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
