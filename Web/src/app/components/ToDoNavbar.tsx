"use client";
import Link from "next/link";
import { useContext } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";
import ToDoContext from "../utils/Context/ToDoContext";

export default function ToDoNavbar() {
  const { filterCompleted, setFilterCompleted } = useContext(ToDoContext);

  function toggleFilterCompleted() {
    setFilterCompleted(!filterCompleted);
  }

  return (
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

          <Button onClick={toggleFilterCompleted}>
            {filterCompleted ? "Show All" : "Filter Completed"}
          </Button>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
