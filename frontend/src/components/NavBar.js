import { Container, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PaintBucket } from "react-bootstrap-icons";
import { getUsername, unsetUser } from "../lib/auth";
import { useState } from "react";

function NavBar() {
  const [username, setUsername] = useState(getUsername());
  const handleLogout = () => {
    unsetUser();
    setUsername(null);
  };
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <PaintBucket size={30} />
          Paint Inventory Manager
        </Navbar.Brand>
        {username && (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              User: <b>{username}</b>
            </Navbar.Text>
            <Link to="/">
              <Button variant="light ms-2" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Link>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
