"use client";
import * as React from "react";
import {
  Bot,
  Settings,
  SquareTerminal,
  ShoppingCart,
  ClipboardCheck,
  Package,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { useUser } from "@/components/context/UserContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
 

  const navMain =
    user?.role === "mealProvider"
      ? [
          {
            title: "Dashboard",
            url: "/mealProvider/dashboard",
            icon: SquareTerminal,
            isActive: true,
          },
          {
            title: "Meal",
            url: "/mealProvider/dashboard/food/foods/manage-food",
            icon: Bot,
            items: [
              {
                title: "Manage Meal",
                url: "/mealProvider/dashboard/food/foods/manage-food",
              },
              {
                title: "Add Meal",
                url: "/mealProvider/dashboard/food/foods/add-food",
              },
              {
                title: "Manage Order",
                url: "/mealProvider/dashboard/food/foods/manage-order",
              },
              // {
              //   title: "Update Food",
              //   url: "/mealProvider/dashboard/food/foods/update-food/:foodId",
              // },
            ],
          },
          {
            title: "Profile",
            url: "/profile",
            icon: Settings,
          },
        ]
      : user?.role === "customer"
      ? [
          {
            title: "Dashboard",
            url: "/customer/dashboard",
            icon: SquareTerminal,
            isActive: true,
          },
          {
            title: "Manage Orders",
            url: "/customer/dashboard/manage-order",
            icon: Package,
          },
          {
            title: "Track Order",
            url: "/customer/dashboard/track-order",
            icon: ClipboardCheck,
          },
          {
            title: "Cart",
            url: "/cart",
            icon: ShoppingCart,
          },
          {
            title: "Profile",
            url: "/profile",
            icon: Settings,
          },
        ]
      : [
          {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: SquareTerminal,
            isActive: true,
          },
        ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-red-100/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center"></div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="font-bold text-xl">
                    <Link href="/" className="text-red-400 text-2xl font-bold">
                      Meal
                      <span className="text-green-400 dark:text-white">
                        Box
                      </span>
                    </Link>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-red-100/10">
        <NavMain  items={navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-red-100/10">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
