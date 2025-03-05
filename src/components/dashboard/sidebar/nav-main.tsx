"use client";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu className="">
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={`shadow-xl border-b-2 border-b-red-400 shadow-red-400/5 mb-2 py-2 px-4 flex items-center gap-3 rounded-lg  transition-all duration-300 ease-in-out hover:shadow-xl hover:border-red-400 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400`}
                asChild
                tooltip={item.title}
              >
                <Link href={item.url} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-red-400" />
                  <span className="text-lg font-medium text-gray-700 hover:text-red-400 transition-all">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>

              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem
                          key={subItem.title}
                          className="mb-2"
                        >
                          <SidebarMenuSubButton
                            asChild
                            className={`shadow-xl mb-2 mt-2 border-dotted border-2 py-2 border-red-200`}
                          >
                            <Link
                              href={subItem.url}
                              className="flex items-center gap-3"
                            >
                              <span className="text-lg font-medium text-gray-700 hover:text-red-400 transition-all ">
                                {subItem.title}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
