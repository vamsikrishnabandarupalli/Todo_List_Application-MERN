import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import profile from "../../assets/profile.jpg";
import { RiContactsBook2Fill } from "react-icons/ri";

export default function Navigationbar({ isLoggedIn, username, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-info-subtle">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <b className="text-primary">
            <RiContactsBook2Fill /> todo
          </b>
        </Link>
        <button
          className="navbar-toggler w-auto fs-5"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/todo">
                Todo
              </Link>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="nav-item my-0">
                  <Link className="nav-link active" to="/signin">
                    Sign In
                  </Link>
                </li>
                <li className="nav-item my-0">
                  <Link className="nav-link active" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={profile}
                    className="rounded-circle"
                    alt="profile"
                    width="30"
                    height="30"
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-lg-end my-2 mx-auto"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <p className="text-center">{username}</p>
                    <button
                      className="btn nav-link text-dark text-center"
                      onClick={onLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navigationbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};
