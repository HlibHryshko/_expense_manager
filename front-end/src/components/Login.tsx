import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = (response: CredentialResponse) => {
    const token = response.credential;
    console.log(token);

    const userObject = jwtDecode(token!); // Use jwtDecode function directly

    console.log("User: ", userObject);

    // Store token in local storage (or a more secure alternative)
    localStorage.setItem("authToken", token!);

    // Navigate to the dashboard or another page after login
    navigate("/dashboard");
  };

  const handleFailure = () => {
    console.log("Login Failed");
  };

  return (
    <div>
      <h1>Login</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </div>
  );
};

export default Login;
