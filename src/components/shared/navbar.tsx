import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Badge } from "@heroui/badge";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { ThemeSwitch } from "@/components/shared/theme-switch.tsx";
import { logo } from "@/components/primitives.ts";
import UserAnimation from "@/components/animations/UserAnimation.tsx";
import { useAuthStore, useCategoriesStore, useUserStore } from "@/stores";
import LogoAnimated from "@/components/animations/LogoAnimated.tsx";

export const Navbar = () => {
  const { logout } = useAuthStore();
  const { user } = useUserStore();
  const { clearCategories } = useCategoriesStore();
  const navigate = useNavigate();

  const onSignOut = () => {
    logout();
    clearCategories();
    toast.success("Bye Bye 👋🏻 👋🏻 👋🏻");
    navigate("/login");
  };

  const UserToggle = (
    <NavbarItem>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <button className="mt-1 h-8 w-8 outline-none transition-transform">
            <Badge
              className="border-transparent"
              color="success"
              content=""
              placement="bottom-right"
              shape="circle"
              size="sm"
            >
              <UserAnimation />
            </Badge>
          </button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold ">({user?.email})</p>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={onSignOut}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarItem>
  );

  return (
    <HeroUINavbar className="-mt-10" maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/3 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="#"
          >
            <LogoAnimated />
            <p
              className={
                "-ml-4 font-bold text-inherit" + logo({ color: "cyan" })
              }
            >
              Ultra Secure
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>

        {UserToggle}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        {UserToggle}
      </NavbarContent>
    </HeroUINavbar>
  );
};
