import { Button } from "react-bootstrap";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Snackbar, Alert, CircularProgress } from "@mui/material";
import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const history = useNavigate();
  const [open, setOpen] = useState(false);
  const [passwordtype, setPasswordType] = useState("password");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    login(data)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify({ ...res?.data }));
        console.log(res);
        history("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        setOpen(true);
        if (err.response && err.response.data) {
          setError(err.response.data);
        } else {
          setError(err.message);
        }
      });
  };

  const handleEyeClick = () => {
    if (passwordtype === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const handleGuestLogin = () => {
    setLoading(true);
    login({ email: "test@example.com", password: "test@123" })
      .then((res) => {
        setLoading(false);
        localStorage.setItem("user", JSON.stringify({ ...res?.data }));
        console.log(res);
        history("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        setOpen(true);
        if (err.response && err.response.data) {
          setError(err.response.data);
        } else {
          setError(err.message);
        }
      });
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Container fluid>
        <Row className="crow">
          <Col lg={7} className="column-1">
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontFamily: "Playfair",
                  color: "white",
                  textAlign: "center",
                  fontSize: "44px",
                }}
              >
                Travelify
              </h1>
              <p
                style={{
                  fontFamily: "serif",
                  color: "white",
                  textAlign: "center",
                  fontSize: "28px",
                }}
              >
                Find your right travelling partner
              </p>
            </div>
          </Col>
          <Col lg={5}>
            <div className="border-dark login-form-block">
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <h2 className="mb-1 title">Welcome Back!</h2>
                  <text style={{ fontWeight: "400", color: "gray" }}>
                    Please enter your details to login!
                  </text>
                  <Form.Group style={{ marginTop: "25px" }}>
                    <Form.Label style={{ fontWeight: "500" }}>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      onChange={handleChange}
                      name="email"
                      type="email"
                      placeholder="myemail.address.com"
                    />
                  </Form.Group>
                  <Form.Group
                    style={{ marginTop: "20px", marginBottom: "40px" }}
                  >
                    <Form.Label style={{ fontWeight: "500" }}>
                      Password
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        onChange={handleChange}
                        name="password"
                        type={passwordtype}
                        placeholder="**********"
                      />
                      <span
                        style={{ border: "solid 1px #cbc8ca", padding: "5px" }}
                      >
                        {passwordtype === "password" ? (
                          <VisibilityIcon
                            style={{ marginRight: "2%", cursor: "pointer" }}
                            onClick={handleEyeClick}
                          />
                        ) : (
                          <VisibilityOffIcon
                            style={{ marginRight: "2%", cursor: "pointer" }}
                            onClick={handleEyeClick}
                          />
                        )}
                      </span>
                    </InputGroup>
                  </Form.Group>
                  <div className="d-grid">
                    <Button type="submit" className="custom-btn">
                      Signin
                    </Button>
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <text>Don't have an account?</text>
                      <Link to="/register">Register</Link>
                    </div>
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <text>Login as guest?</text>
                      <text
                        style={{
                          color: "blue",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={handleGuestLogin}
                      >
                        Guest Login
                      </text>
                    </div>
                  </div>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
