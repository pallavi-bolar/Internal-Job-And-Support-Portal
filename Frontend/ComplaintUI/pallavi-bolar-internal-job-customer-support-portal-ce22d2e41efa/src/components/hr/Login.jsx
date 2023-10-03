import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }
    const credentials = {
      fullName: username,
      password: password,
    };

    const authenticate = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(
        "http://localhost:8081/api/employees/getRoleByFullNameAndPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const responseData = await response.text();

      if (response.status === 200) {
        if (responseData === "Invalid credentials") {
          toast.error(`Invalid credentials`, {
            className: "custom-toast",
          });
        } else {
          const role = responseData;
          // Redirect based on the role
          if (role === "HR") {
            navigate("/hr-dashboard");
          } else if (role === "CUSTOMER_SUPPORT") {
            navigate("/support-dashboard");
          } else if (role === "CANDIDATE") {
            navigate("/candidate-dashboard");
          }

          const authResponse = await fetch(
            "http://localhost:8081/api/authenticate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(authenticate),
            }
          );

          if (authResponse.status === 200) {
            const jwtToken = await authResponse.text();
            // Save JWT token to local storage
            localStorage.setItem("jwtToken", jwtToken);
          } else {
            // Show incorrect credentials message
            toast.error("Incorrect username or password");
          }
        }
      } else if (response.status === 404) {
        // Show user not found message
        toast.error("User not found");
      } else {
        // Show other error message
        toast.error("Error occurred");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <MDBContainer
        fluid
        className="p-4 background-radial-gradient overflow-hidden custom-container d-flex justify-content-center align-items-center"
      >
        <MDBRow>
          <MDBCol
            md="6"
            className="text-center text-md-start d-flex flex-column custom-text"
          >
            <img src="./cs.png" alt="Login image" className="img-fluid" />
          </MDBCol>

          <MDBCol md="4">
            <MDBCard className="custom-card">
              <MDBCardBody className="p-5">
                <div className="login-header">
                  <span className="colored-text">Login Form</span>
                </div>
                <br />
                <label htmlFor="form3" className="form-label">Username</label>
                <MDBInput
                  wrapperClass="mb-4"
                  // label="Username"
                  id="form3"
                  type="textarea"
                  className="custom-input custom-lg-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  // style={{ marginBottom: '20px' }}
   
   />
   <label htmlFor="form4" className="form-label">Password</label>
                <MDBInput
                  wrapperClass="mb-4"
                  // label="Password"
                  id="form4"
                  type="password"
                  className="custom-input custom-lg-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               
                />

                <MDBBtn
                  className="w-100 mb-4 custom-button custom-lg-button"
                  size="lg"
                  onClick={handleLogin}
                >
                  Login
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;