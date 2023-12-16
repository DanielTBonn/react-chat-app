import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    Container
} from 'react-bootstrap';

function AppNavbar() {

    return (
        <Navbar expand="lg" className="navbar">
            <Container fluid>
                <Navbar.Brand as={Link} to="/" style={{fontSize: "34px", textDecoration: "none", color: "#000000"}}>REACT CHAT</Navbar.Brand>
            </Container>
        </Navbar>
    )

}

export default AppNavbar;