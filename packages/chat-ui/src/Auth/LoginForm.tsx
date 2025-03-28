import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React, { FormEvent, useContext, useState } from "react";
import { ChatContext } from "../ChatContext";
import { AdminLogin } from "./AdminLogin";
import { GuestLogin } from "./GuestLogin";

interface LoginFormProps {
  getAndSetUser: (jwtToken: string) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ getAndSetUser }) => {
  const { userName, setUserName, email, setEmail, setToken, setIsLoggedIn } =
    useContext(ChatContext);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const endpoint = showAdminLogin
      ? process.env.REACT_APP_API_BASE_URL+"/api/auth/login"
      : process.env.REACT_APP_API_BASE_URL+"/api/auth/guest-token";

    const id = Math.random().toString(36).substring(2, 15);

    const payload = showAdminLogin
      ? { email, password }
      : { conversationKey: id, name: userName, email };

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          const jwt = data.token;
            document.cookie = `jwt=${jwt}; Domain=.${process.env.REACT_APP_COOKIE_DOMAIN}; Path=/; SameSite=None; Secure; HttpOnly;`;
            
          setToken(jwt);
          setIsLoggedIn(true);
          getAndSetUser(jwt);
        }
      })
      .catch((err) => console.error("Error fetching token:", err));
  };

  return (
    <form
      className="formStyle"
      onSubmit={handleSubmit}
      data-testid="login-form"
    >
      <p data-testid="login-message">
        Want to chat with PhilaPrints? <br /> Enter your name and email.
      </p>
      <div className="iconContainer" data-testid="lottie-container">
        <DotLottieReact
          src="https://lottie.host/1ae6808e-3519-498e-a1bf-f85a9dec2b3b/COxuVY2DPb.lottie"
          loop
          autoplay
        />
      </div>
      {showAdminLogin ? (
        <div data-testid="admin-login">
          <AdminLogin
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          />
        </div>
      ) : (
        <div data-testid="guest-login">
          <GuestLogin
            userName={userName}
            setUserName={setUserName}
            email={email}
            setEmail={setEmail}
          />
        </div>
      )}
      <div className="adminLoginButton">
        <small
          onClick={() => setShowAdminLogin(!showAdminLogin)}
          data-testid="toggle-login-mode"
        >
          {showAdminLogin ? "Customer Login" : "Admin Login"}
        </small>
      </div>
    </form>
  );
};
