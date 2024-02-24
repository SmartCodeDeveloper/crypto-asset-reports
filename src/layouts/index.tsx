import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import { SidebarContext } from "@/contexts/SidebarContext";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import routes from "@/routes";
import Footer from "./Footer";

const Layout = (props: { [x: string]: any }) => {
  const { ...rest } = props;

  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { onOpen } = useDisclosure();

  const getActiveRoute = (routes: RoutesType[]): string => {
    const activeRoute = "";
    for (let i = 0; i < routes.length; i++) {
      console.log(routes[i].path);
      if (window.location.href.indexOf(routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };

  const getActiveNavbar = (routes: RoutesType[]) => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (window.location.href.indexOf(routes[i].path) !== -1) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  const getActiveNavbarText = (routes: RoutesType[]): string | boolean => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (window.location.href.indexOf(routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return activeNavbar;
  };

  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((route: RoutesType, key: any) => {
      return <Route path={route.path} component={route.component} key={key} />;
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        toggleSidebar,
        setToggleSidebar,
      }}
    >
      <Sidebar routes={routes} display="none" {...rest} />
      <Box
        float="right"
        minHeight="100vh"
        height="100%"
        overflow="auto"
        position="relative"
        maxHeight="100%"
        w={{ base: "100%", xl: "calc( 100% - 290px )" }}
        maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
      >
        {getActiveRoute(routes) && (
          <Portal>
            <Box>
              <Navbar
                onOpen={onOpen}
                logoText={""}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>
        )}

        <Box
          mx="auto"
          p={{ base: "20px", md: "30px" }}
          pe="20px"
          pt="50px"
        >
          <Switch>
            {getRoutes(routes)}
            <Redirect from="/" to="/crypto-assets" />
          </Switch>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </SidebarContext.Provider>
  );
};

export default Layout;
