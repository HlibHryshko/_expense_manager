import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const token = credentialResponse.credential;
      console.log(token);

      const response = await axios.post(
        "http://localhost:5000/api/auth/oauth/google",
        {
          token,
        }
      );

      // Store token in local storage (or a more secure alternative)
      localStorage.setItem("authToken", response.data.token!);

      // Navigate to the dashboard or another page after login
      navigate("/dashboard");
    } catch (error) {
      console.error("Google OAuth login failed", error);
    }
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
