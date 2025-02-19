import { useState } from "react";
import { styled } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SignInForm from "../components/signInForm";
import SignUpForm from "../components/SignUpForm";

export enum AuthType {
  LOGIN = "LOGIN",
  SIGNUP = "SIGNUP",
}

const SignIn = () => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.LOGIN);
  const handleAuthType = () => {
    setAuthType(authType === AuthType.LOGIN ? AuthType.SIGNUP : AuthType.LOGIN);
  };
  return (
    <Grid container alignItems="center">
      <Grid flex={1} justifyItems={"center"}>
        <Div>
          <img
            src="/images/logoTest.jpg"
            alt="Guestna - link not found"
            width={300}
            height={300}
          />
        </Div>
      </Grid>
      <Grid flex={1}>
        {authType === AuthType.LOGIN && (
          <SignInForm handleAuthType={handleAuthType} />
        )}
        {authType === AuthType.SIGNUP && (
          <SignUpForm handleAuthType={handleAuthType} />
        )}
      </Grid>
    </Grid>
  );
};

export default SignIn;

const Div = styled("div")(`
   .image-gallery-slide-wrapper.bottom{
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
  }
`);
