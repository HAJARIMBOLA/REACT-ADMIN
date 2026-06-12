import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { CustomAppBar } from "./components/CustomAppBar";
import { CustomMenu } from "./components/CustomMenu";

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout appBar={CustomAppBar} menu={CustomMenu}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
