import styled from "styled-components";
import { useUser } from "./features/authentication/useUser"
import Spinner from "./ui/Spinner"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height:100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRout({ children }) {
  const { isAuthenticated, isLoading } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login", { replace: true });
  }, [isAuthenticated, isLoading, navigate])

  if (isLoading) return <FullPage><Spinner /></FullPage>
  if (isAuthenticated) return children

}

