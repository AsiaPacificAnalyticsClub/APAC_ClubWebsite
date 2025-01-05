"use client";
import React, { useState } from "react";
import Image from "next/image";
import { headerLinks } from "@/constants/headerLinks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Menu, MenuItem } from "@mui/material";

const Header = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="sticky inset-0 z-20 top-0 backdrop-blur-sm shadow-md">
      {/*Header Content*/}
      <div className="px-12 py-2 ">
        <div className="flex flex-row justify-between">
          {/*Logo*/}
          <div>
            <Link href={"/"}>
              <Image
                src="/apaclogo.png"
                alt="Club Website Logo"
                width={100}
                height={100}
                className="object-contain items-center justify-center mt-1"
              />
            </Link>
          </div>

          {/*Burger Menu*/}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-10 h-10 flex items-center justify-center z-50"
          >
            <span
              className={`absolute h-0.5 w-5 bg-black transform transition duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 bg-black transform transition-all duration-200 ease-in-out ${
                isOpen ? "w-0 opacity-50" : "w-5 opacity-100"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-5 bg-black transform transition duration-300 ease-in-out ${
                isOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
              }`}
            ></span>
          </button>

          {/*Mobile Navigation*/}
          <div
            className={`md:hidden fixed inset-0  transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
          >
            <div className="flex flex-col items-center justify-center h-screen px-6">
              {/*Mobile Links*/}
              <div className="flex flex-col items-center gap-8 bg-blue-200/100 h-screen w-screen py-7">
                <div className=" mt-5 py-2 flex flex-col gap-10 justify-center items-center">
                  <Link
                    href={"/"}
                    onClick={() => {
                      setIsOpen(false);
                      document.body.style.overflow = "unset";
                    }}
                  >
                    <p
                      className={clsx(
                        "text-2xl font-medium transition-colors duration-200",
                        pathName === "/"
                          ? "text-blue-900 font-bold"
                          : "text-blue-600/80 hover:text-white",
                      )}
                    >
                      Home
                    </p>
                  </Link>
                  {headerLinks.map((link, key) => (
                    <Link
                      href={link.link}
                      key={key}
                      onClick={() => {
                        setIsOpen(false);
                        document.body.style.overflow = "unset";
                      }}
                    >
                      <p
                        className={clsx(
                          "text-2xl font-medium transition-colors duration-200",
                          pathName === link.link
                            ? "text-blue-900 font-bold"
                            : "text-blue-600/80 hover:text-white",
                        )}
                      >
                        {link.headerName}
                      </p>
                    </Link>
                  ))}
                </div>
                {/*Mobile Button*/}
                <div className="">
                  <button
                    className="btn bg-white text-blue-600 hover:bg-white/90"
                    onClick={handleClick}
                  >
                    Join Our Club
                  </button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfLyy3a3sSqbep0Hyxx-RYmf7sgK5D-qwkPBwcqpOMlfeAx2g/viewform"
                        target="_blank"
                        onClick={() => {
                          setIsOpen(false);
                          document.body.style.overflow = "unset";
                        }}
                      >
                        As Member
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfLyy3a3sSqbep0Hyxx-RYmf7sgK5D-qwkPBwcqpOMlfeAx2g/viewform"
                        target="_blank"
                        onClick={() => {
                          setIsOpen(false);
                          document.body.style.overflow = "unset";
                        }}
                      >
                        As Committee
                      </Link>
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          {/*Desktop Links and Button*/}
          <div className="md:flex-row items-center gap-[50px] hidden md:flex">
            {/*Link*/}
            <div className="flex gap-2">
              {headerLinks.map((link, key) => (
                <Link href={link.link} key={key}>
                  <p
                    className={clsx(
                      "hover-btn",
                      pathName === link.link && "text-blue-700",
                    )}
                  >
                    {link.headerName}
                  </p>
                </Link>
              ))}
            </div>
            {/*Button*/}
            <div>
              <button className="btn" onClick={handleClick}>
                Join Our Club
              </button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfLyy3a3sSqbep0Hyxx-RYmf7sgK5D-qwkPBwcqpOMlfeAx2g/viewform"
                    target="_blank"
                    onClick={() => {
                      setIsOpen(false);
                      document.body.style.overflow = "unset";
                    }}
                  >
                    As Member
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    href="https://forms.gle/B9sJvL9PUntocNcx6"
                    target="_blank"
                    onClick={() => {
                      setIsOpen(false);
                      document.body.style.overflow = "unset";
                    }}
                  >
                    As Committee
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
