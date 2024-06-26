import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const LoginScreen = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    //get user from state
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo, error, loading } = userLogin;

    useEffect(() => {
        //if user is logged
        if (userInfo) {
            history.push("/dashboard");
        }
    }, [history, userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <div
            className="row justify-content-center align-items-center vh-100"
            style={{ backgroundColor: "#191423", margin: "0"}}
        >
            <div className="login-box">
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-header ">
                        <div className="login-logo">
                            <h1>BAKANO</h1>
                            <div className="text-center">
                                <img
                                    className="img-fluid"
                                    decoding="async"
                                    src={"/bakano-isotipo-negro.webp"}
                                    alt="User profile picture"
                                    style={{width: '100px'}}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">
                            Sign in to start your session
                        </p>
                        {loading && <Loader variable={loading} />}
                        {error && <Message message={error} color={"danger"} />}
                        <form onSubmit={submitHandler}>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>

                            <div className="row justify-content-end">
                                <div className="col-4">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </div>
                            <br />
                        </form>
                        <div></div>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
