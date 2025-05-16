import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import "./App.scss";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications position="top-right"/>
      <Outlet />
    </MantineProvider>
  );
}
