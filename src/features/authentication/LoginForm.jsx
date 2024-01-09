import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoading } = useLogin({ email, password });
  const { isLoading: isAuthenticating, isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated && !isAuthenticating) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, isAuthenticating, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  if (isLoading || isAuthenticating) return <Spinner />;
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormRowVertical label="Email address">
        <Input type="email" id="email" autoComplete="username" value={email} disabled={isLoading} onChange={(e) => setEmail(e.target.value)} />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input type="password" id="password" autoComplete="current-password" value={password} disabled={isLoading} onChange={(e) => setPassword(e.target.value)} />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLoading} size="large">
          {isLoading ? <SpinnerMini /> : "Log in"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
