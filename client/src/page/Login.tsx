import React, { useState } from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import { BsFillExclamationCircleFill } from "react-icons/bs";

export default function Login() {
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email.includes("@")) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  return (
    <LoginContainer>
      <LoginContent>
        <LogoImgContainer>
          <Link to="/">
            <StackOverflowIcon
              src={
                process.env.PUBLIC_URL +
                "/Stack_Overflow_icon-icons.com_66761.png"
              }
              alt="logo"
            />
          </Link>
        </LogoImgContainer>
        <OAuthContainer>
          <ButtonGoogle>
            <GoogleIcon
              src={process.env.PUBLIC_URL + "icons8-google-logo-48.png"}
            />
            Log in with Google
          </ButtonGoogle>
          <ButtonGitHub>
            <GitHubIcon
              src={process.env.PUBLIC_URL + "icons8-github-logo-32.png"}
            />
            Log in with GitHub
          </ButtonGitHub>
          <ButtonFacebook>
            <FacebookIcon
              src={process.env.PUBLIC_URL + "icons8-facebook-logo-30.png"}
            />
            Log in with Facebook
          </ButtonFacebook>
        </OAuthContainer>
        <FormContainer>
          <EmailContainer>
            <Email>Email</Email>
            <EmailInputBox emailError={emailError}>
              <EmailInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <ExclamationMark />}
            </EmailInputBox>
            {emailError && (
              <ErrorMsg>The email is not a valid email address.</ErrorMsg>
            )}
          </EmailContainer>
          <PasswordContainer>
            <PasswordContent>
              <Password>Password</Password>
              <PasswordForgot>Forgot password?</PasswordForgot>
            </PasswordContent>
            <PasswordInputBox passwordError={passwordError}>
              <PasswordInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && <ExclamationMark />}
            </PasswordInputBox>
            {passwordError && <ErrorMsg>Password cannot be empty.</ErrorMsg>}
          </PasswordContainer>
          <LoginButton onClick={handleLogin}>Log in</LoginButton>
        </FormContainer>
        <SignUpContainer>
          Don’t have an account?&nbsp;
          <LinkSignUp to="/join">Sign up</LinkSignUp>
        </SignUpContainer>
        <SignUpContainer>
          Are you an employer?&nbsp;
          <LinkSignUp to="https://talent.stackoverflow.com/users/login">
            Sign up on Talent
          </LinkSignUp>
        </SignUpContainer>
      </LoginContent>
    </LoginContainer>
  );
}

const LoginContainer = tw.div`
bg-[#F1F2F3]
w-screen h-screen
overflow-hidden
flex
justify-center
items-center
`;
const LoginContent = tw.div`
flex
flex-col
items-center
w-[300px] h-[566px]
bg-[#F1F2F3]
`;
const OAuthContainer = tw.div`
flex
flex-col
items-center
justify-center
w-[300px] h-[134px]
mb-[16px]
`;
const ButtonGoogle = tw.button`
bg-[#ffffff]
w-[100%] h-[37px]
rounded-[5px]
my-[4px]
text-[13px]
flex
justify-center
items-center
`;
const GoogleIcon = tw.img`
w-[22px] h-[22px]
`;
const ButtonGitHub = tw.button`
bg-[#2F3337]
text-white text-[13px]
w-[100%] h-[37px]
rounded-[5px]
my-[4px]
flex
justify-center
items-center
`;
const GitHubIcon = tw.img`
w-[22px] h-[22px]
`;
const ButtonFacebook = tw.button`
bg-[#385499]
text-white text-[13px]
w-[100%] h-[37px]
rounded-[5px]
my-[4px]
flex
justify-center
items-center
`;
const FacebookIcon = tw.img`
w-[22px] h-[22px]
`;
const LogoImgContainer = tw.div`
flex
justify-center
h-[37px]
mb-[24px]

&:hover {
  cursor-pointer
}
`;
const StackOverflowIcon = tw.img`
w-[32px] h-[37px]
`;

const FormContainer = tw.div`
w-[300px] h-[256px]
bg-white
flex
flex-col
justify-center
items-center
mb-[24px]
shadow-[0px_10px_24px_#0000000d]
rounded-[5px]
`;
const EmailContainer = tw.div`
flex
flex-col
my-[6px]
`;
const Email = tw.label`
font-[600]
text-[15px]
my-[2px]
`;
const EmailInputBox = tw.div<{ emailError: boolean }>`
my-[2px]
border-solid border
${(props) => (props.emailError ? "border-[#de4f54]" : "border-[#BABFC4]")}
w-[256px] h-[30px]
rounded-[3px]
flex
items-center
`;
const EmailInput = tw.input`
outline-none
w-[230px] h-[100%]
text-[12px]
py-[7.8px] pl-[9.1px]
`;
const ExclamationMark = tw(BsFillExclamationCircleFill)`
text-[#de4f54]
`;
const PasswordContainer = tw.div`
flex
flex-col
my-[6px]
`;
const PasswordContent = tw.div`
flex
justify-between
items-center
my-[2px]
`;
const Password = tw.label`
font-[600]
text-[15px]
`;
const PasswordForgot = tw.a`
text-xs text-[#0074cc]

&:hover {
  cursor-pointer
}
`;
const PasswordInputBox = tw.div<{ passwordError: boolean }>`
my-[2px]
border-solid border
${(props) => (props.passwordError ? "border-[#de4f54]" : "border-[#BABFC4]")}
w-[256px] h-[30px]
rounded-[3px]
flex
items-center
`;
const PasswordInput = tw.input`
outline-none
w-[230px] h-[100%]
text-[12px]
py-[7.8px] pl-[9.1px]
`;
const LoginButton = tw.button`
bg-[#0a95ff]
my-[6px]
w-[256px] h-[37px]
text-white text-[12px]
rounded-[3px]

hover:bg-[#0063bf]
`;
const SignUpContainer = tw.div`
w-[300px]
px-[24px]
flex
justify-center
items-center
text-[13px]
mt-[12px]
`;
const LinkSignUp = tw(Link)`
text-[#0074cc]
`;
const ErrorMsg = tw.p`
text-[#de4f54] text-[11px]
`;
