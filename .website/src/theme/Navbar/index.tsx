import { useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Navbar from "@theme-original/Navbar";
import clsx from "clsx";
import { ComponentProps } from "react";

export default function NavbarWrapper(props: ComponentProps<typeof Navbar>) {
  const { pathname } = useLocation();

  const homePath = useBaseUrl("/");
  const modelsPath = useBaseUrl("/models/");

  const hasGlassMenu =
    pathname === homePath ||
    pathname.startsWith(modelsPath);

  return (
    <div className={clsx({ navbarGlass: hasGlassMenu })}>
      <Navbar {...props} />
    </div>
  );
}
