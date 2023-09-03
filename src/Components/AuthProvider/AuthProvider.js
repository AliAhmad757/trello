"use client";
import React from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { usePathname } from "next/navigation";
import Image from "next/image";
const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
