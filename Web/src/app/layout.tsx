import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Container, Nav, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "react-bootstrap";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-loading-skeleton/dist/skeleton.css'
import CustomTanstackProvider from "./utils/CustomTanstackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To Do",
  description: "A simple To Do App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomTanstackProvider>
          <Navbar expand="sm" className="">
            <Container>
              <NavbarBrand>To Do</NavbarBrand>
              <NavbarToggle aria-controls="basic-navbar-nav" />
              <NavbarCollapse>
                <Nav className="me-auto">
                    <Link href={"/"} className="text-black nav-link">
                      Project Board
                    </Link>
                </Nav>
              </NavbarCollapse>
            </Container>
          </Navbar>
          {children}
        </CustomTanstackProvider>
      </body>
    </html>
  );
}
