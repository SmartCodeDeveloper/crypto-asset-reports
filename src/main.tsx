import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { HashRouter, Route, Switch } from "react-router-dom";
// import Preloader from '@/components/Preloader';

import Layout from "@/layouts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <HashRouter>
        <Switch>
          <Route path="/" component={Layout} />
        </Switch>
      </HashRouter>
    </React.StrictMode>
  </ChakraProvider>
);
