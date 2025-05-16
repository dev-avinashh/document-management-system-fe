import { ReactNode, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  AppShell,
  Navbar,
  Header,
  Text,
  Group,
  ThemeIcon,
  Box,
  ScrollArea,
  UnstyledButton,
  Stack,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import { IconRocket, IconPackage, IconLogout, IconUserPlus } from "@tabler/icons-react";
import { useAuthStore } from "../../store/auth.store";

interface INavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

const navItems: INavItem[] = [
  {
    label: "Upload Document",
    icon: <IconRocket size={16} />,
    path: "/dashboard/upload-document",
  },
  {
    label: "Search Document",
    icon: <IconPackage size={16} />,
    path: "/dashboard/search-document",
  },
  {
    label: "Search Document",
    icon: <IconUserPlus size={16} />,
    path: "/dashboard/create-user",
  },
];

const Dashboard = () => {
  const logout = useAuthStore((state) => state.logout);
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="xs"
          width={{ base: 300 }}
          hiddenBreakpoint="sm"
          hidden={!opened}
        >
          <Navbar.Section>
            <Group p="md" position="apart">
              <Group>
                <Text fw={700}>Document Management System</Text>
              </Group>
            </Group>
          </Navbar.Section>
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <Stack spacing={0}>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpened(false)}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    backgroundColor: isActive ? "#d0ebff" : "transparent",
                    color: isActive ? "#1c7ed6" : "#333",
                    display: "block",
                    padding: "10px",
                    borderRadius: "4px",
                  })}
                >
                  <Group>
                    <ThemeIcon variant="light" color="blue" size="sm">
                      {item.icon}
                    </ThemeIcon>
                    <Text size="sm">{item.label}</Text>
                  </Group>
                </NavLink>
              ))}
            </Stack>
          </Navbar.Section>
          <Navbar.Section>
            <UnstyledButton
              onClick={logout}
              sx={{
                display: "block",
                padding: "10px",
                color: "#333",
              }}
            >
              <Group>
                <ThemeIcon variant="light" color="red" size="sm">
                  <IconLogout size={16} />
                </ThemeIcon>
                <Text size="sm" weight="bold">
                  Logout
                </Text>
              </Group>
            </UnstyledButton>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Group position="apart" sx={{ height: "100%" }}>
            <Group>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xs"
                />
              </MediaQuery>
              <Text size="lg" weight={600} ml={20}>
                Admin Dashboard
              </Text>
            </Group>
          </Group>
        </Header>
      }
    >
      <Box pt="xs">
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default Dashboard;
