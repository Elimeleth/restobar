import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Menu = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            redirectTo();
        }
    }, [dispatch, userInfo]);

    const redirectTo = () => {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { referrer: "/" },
                }}
            />
        );
    };

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4 Bk-bg-black">
            {/* Brand Logo */}
            <Link to={"/dashboard"} className="brand-link">
                <img
                    decoding="async"
                    src="/bakano-isotipo-blanco.webp"
                    alt="Logo de Bakano"
                    className="brand-image"
                />
                <span className="brand-text font-weight-bold">BAKANO</span>
            </Link>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src={userInfo ? userInfo.image : "/comandera.webp"}
                            className="img-circle elevation-2"
                            alt="User"
                        />
                    </div>
                    <div className="info">
                        <Link to="/profile" className="d-block">
                            {userInfo ? userInfo.name : ""}
                        </Link>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />{" "}
                                <p> Dashboard</p>
                            </Link>
                        </li>

                        {!userInfo ? (
                            ""
                        ) : userInfo.isAdmin === true ? (
                            <>
                                <li className="nav-header">ADMIN</li>
                                <li className="nav-item">
                                    <Link to="/user" className="nav-link">
                                        <i className="nav-icon fas fa-users" />{" "}
                                        <p> Users</p>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            ""
                        )}

                        <li className="nav-header">COMANDERA</li>
                        <li className="nav-item">
                            <Link to="/active" className="nav-link">
                                <i className="nav-icon fas fa-bell" />{" "}
                                <p> Active Orders</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/delivery" className="nav-link">
                                <i className="nav-icon fas fa-truck" />{" "}
                                <p> Delivery</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/order" className="nav-link">
                                <i className="nav-icon far fa-clipboard" />{" "}
                                <p> Orders</p>
                            </Link>
                        </li>

                        <li className="nav-header">MANAGEMENT</li>

                        <li className="nav-item">
                            <Link to="/category" className="nav-link">
                                <i className="nav-icon fas fa-list-alt" />{" "}
                                <p> Categories</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/product" className="nav-link">
                                <i className="nav-icon fas fa-hamburger" />{" "}
                                <p> Products</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/client" className="nav-link">
                                <i className="nav-icon fas fa-user" />{" "}
                                <p> Clients</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/table" className="nav-link">
                                <i className="nav-icon fas fa-border-all" />{" "}
                                <p> Tables</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    );
};

export default Menu;
