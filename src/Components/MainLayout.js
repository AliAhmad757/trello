"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Container, Nav, Navbar } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

const MainLayout = ({ children }) => {
  const pathname = usePathname();

  const session = useSession();
  console.log(session);

  return (
    <>
      {pathname === "/login" ? (
        children
      ) : (
        <>
          {session.data ? (
            <div className="">
              <Navbar>
                <Container className="align-items-center">
                  <Navbar.Brand className="me-5">
                    <Image
                      src={"/Logo.png"}
                      width={128}
                      height={28}
                      alt="logo"
                    />
                  </Navbar.Brand>
                  <Nav className="me-auto mt-1">
                    <Link href={"workspaces"}>Workspaces</Link>
                  </Nav>

                  <Nav className="">
                    <Image
                      src={session.data.user.image}
                      alt="User Avatar"
                      className="rounded-circle"
                      width={35}
                      height={35}
                    />
                  </Nav>
                </Container>
              </Navbar>
              {children}
            </div>
          ) : (
            <div className="">
              <Navbar>
                <Container className="align-items-center">
                  <Navbar.Brand>
                    <Image
                      src={"/Logo.png"}
                      width={128}
                      height={28}
                      alt="logo"
                    />
                  </Navbar.Brand>
                  <Nav className="ms-auto mt-1">
                    <Link href={"login"}>Login</Link>
                  </Nav>
                </Container>
              </Navbar>
              {children}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MainLayout;
