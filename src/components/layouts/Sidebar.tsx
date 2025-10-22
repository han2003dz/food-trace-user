/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import clsx from "clsx";
import { LINK_CONFIG, MAIN_ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
type SidebarProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  userDetail: any;
};

const Sidebar = ({ collapsed, setCollapsed, userDetail }: SidebarProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const location = useLocation();
  const pathname = location.pathname;

  const normalizedPath = useMemo(() => {
    if (!pathname) return "/";
    return pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;
  }, [pathname]);

  const isGuest = !userDetail?.information;

  const filteredLinks = useMemo(() => {
    if (isGuest) {
      return LINK_CONFIG.filter(
        (l) =>
          l.href === "/" || l.href === MAIN_ROUTES.HOME || l.id === "explore"
      );
    }
    return LINK_CONFIG.filter((link) => {
      if (link.id === "my-account" && !userDetail?.information) return false;
      return true;
    });
  }, [isGuest, userDetail]);

  const isActive = (href: string) => {
    const hrefNorm =
      href !== "/" && href.endsWith("/") ? href.slice(0, -1) : href;
    if (hrefNorm === "/") return normalizedPath === "/";
    return (
      normalizedPath === hrefNorm || normalizedPath.startsWith(hrefNorm + "/")
    );
  };

  return (
    <aside
      className={clsx(
        "transition-all hidden md:block duration-300 overflow-hidden min-h-screen p-4 fixed top-0 left-0 z-50 border-r border-[#ddd]",
        collapsed ? "w-[72px]" : "w-[250px]"
      )}
    >
      {collapsed ? (
        <div
          className="flex w-8 min-w-8 h-8 min-h-8 mx-auto items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={!isHovered ? "/images/logo.svg" : "/icons/collapsed.svg"}
            alt="Food Trace"
            width={!isHovered ? 32 : 20}
            height={!isHovered ? 32 : 20}
            className="cursor-pointer object-cover"
            onClick={() => {
              setCollapsed(!collapsed);
              setIsHovered(false);
            }}
          />
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <Link to={MAIN_ROUTES.HOME}>
            <div className="text-green-500 text-2xl font-bold">Food Trace</div>
          </Link>
          <button
            type="button"
            aria-label="Toggle Sidebar"
            onClick={() => setCollapsed(!collapsed)}
          >
            <img src={"/icons/close.svg"} alt="close" />
          </button>
        </div>
      )}

      <nav className="flex flex-col gap-2 mt-8">
        {filteredLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.id}
              to={link.href}
              className={clsx(
                "h-10 rounded-full flex items-center gap-2 p-2 text-base font-medium focus:outline-none",
                active
                  ? ""
                  : "text-[#9AA4B2] hover:text-white hover:bg-white/5",
                collapsed && "justify-center"
              )}
              aria-current={active ? "page" : undefined}
            >
              <img
                src={active ? link.iconActive : link.icon}
                alt={link.title}
              />
              {!collapsed && <span>{link.title}</span>}
            </Link>
          );
        })}
      </nav>

      {!isGuest && (
        <>
          <div
            className={clsx(
              "flex items-center mt-6",
              collapsed ? "justify-center" : "justify-between"
            )}
          >
            {!collapsed ? (
              <div className="text-sm whitespace-nowrap text-[#9AA4B2] font-semibold leading-[18px]">
                MY SPACE
              </div>
            ) : (
              <div className="border border-[#E3E8EF] w-full" />
            )}
          </div>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
