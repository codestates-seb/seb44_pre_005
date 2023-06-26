import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import preApi from "../api/preApi";
// import { HmacSHA256 } from "crypto-js";
import tw from "tailwind-styled-components";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { RiQuestionnaireFill } from "react-icons/ri";
import { ImPriceTags } from "react-icons/im";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaTrophy } from "react-icons/fa";

interface Join {
  test: (value: string) => boolean; // 패스워드 유효성 검사 타입 지정
}

export default function Join() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [birthdayError, setBirthdayError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordRegexError, setPasswordRegexError] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    const phoneRegex = /^010-?([0-9]{4})-?([0-9]{4})$/;

    !email.includes("@") ? setEmailError(true) : setEmailError(false); // 이메일 유효성 검사
    if (password === "") {
      // 패스워드 유효성 검사
      setPasswordError(true);
    } else if (!passwordRegex.test(password)) {
      setPasswordError(false);
      setPasswordRegexError(true);
    } else {
      setPasswordRegexError(false);
      setPasswordError(false);
    }
    name === "" ? setNameError(true) : setNameError(false); // 이름 유효성 검사
    phoneRegex.test(phone) && phone !== "" // 휴대폰 유효성 검사
      ? setPhoneError(false)
      : setPhoneError(true);
    birthday === "" ? setBirthdayError(true) : setBirthdayError(false); // 생년월일 유효성 검사

    if (
      !emailError &&
      !passwordError &&
      !passwordRegexError &&
      !nameError &&
      !phoneError &&
      !birthdayError
    ) {
      // const hashedPassword = HmacSHA256(password, "fighting").toString();
      // const data = { name, phone, email, password: hashedPassword, birthday };
      const data = { name, phone, email, password, birthday };

      try {
        const response = await preApi.postMember(data);
        if (response.ok) {
          console.log("성공");
          navigate("/login");
        } else if (response.status === 500) {
          alert("You are already a registered member.");
        } else {
          console.log("실패");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <JoinContainer>
      <JoinExplanationContent>
        <ExplanationTitle>Join the Stack Overflow community</ExplanationTitle>
        <Explanation>
          <RiQuestionnaireFill
            size={26}
            color="#0a95ff"
            style={{ marginRight: "5px" }}
          />
          Get unstuck — ask a question
        </Explanation>
        <Explanation>
          <LuChevronsUpDown
            size={26}
            color="#0a95ff"
            style={{ marginRight: "5px" }}
          />
          Unlock new privileges like voting and commenting
        </Explanation>
        <Explanation>
          <ImPriceTags
            size={26}
            color="#0a95ff"
            style={{ marginRight: "5px" }}
          />
          Save your favorite questions, answers, watch tags, and more
        </Explanation>
        <Explanation>
          <FaTrophy size={26} color="#0a95ff" style={{ marginRight: "5px" }} />
          Earn reputation and badges
        </Explanation>
        <ExplanationSmall>
          Collaborate and share knowledge with a private group for FREE.
        </ExplanationSmall>
        <ExplanationSmallLink href="https://stackoverflow.co/teams/?utm_source=so-owned&utm_medium=product&utm_campaign=free-50&utm_content=public-sign-up">
          Get Stack Overflow for Teams free for up to 50 users.
        </ExplanationSmallLink>
      </JoinExplanationContent>
      <JoinContent>
        <OAuthContainer>
          <ButtonGoogle>
            <GoogleIcon
              src={process.env.PUBLIC_URL + "icons8-google-logo-48.png"}
            />
            Sign up with Google
          </ButtonGoogle>
          <ButtonGitHub>
            <GitHubIcon
              src={process.env.PUBLIC_URL + "icons8-github-logo-32.png"}
            />
            Sign up with GitHub
          </ButtonGitHub>
          <ButtonFacebook>
            <FacebookIcon
              src={process.env.PUBLIC_URL + "icons8-facebook-logo-30.png"}
            />
            Sign up with Facebook
          </ButtonFacebook>
        </OAuthContainer>
        <FormContainer>
          <NameContainer>
            <InputLabel>Display name</InputLabel>
            <NameInputBox nameError={nameError}>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
              {nameError && <ExclamationMark />}
            </NameInputBox>
            {nameError && <ErrorMsg>Name cannot be empty.</ErrorMsg>}
          </NameContainer>
          <PhoneContainer>
            <InputLabel>Phone</InputLabel>
            <PhoneInputBox phoneError={phoneError}>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              {phoneError && <ExclamationMark />}
            </PhoneInputBox>
            {phoneError && (
              <ErrorMsg>
                The mobile phone number must consist of an 11-digit number
                starting with 010 and a '-'.
              </ErrorMsg>
            )}
          </PhoneContainer>
          <BirthdayContainer>
            <InputLabel>Birthday</InputLabel>
            <BirthdayInputBox birthdayError={birthdayError}>
              <Input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
              {birthdayError && <ExclamationMark />}
            </BirthdayInputBox>
            {birthdayError && <ErrorMsg>Birthday cannot be empty.</ErrorMsg>}
          </BirthdayContainer>
          <EmailContainer>
            <InputLabel>Email</InputLabel>
            <EmailInputBox emailError={emailError}>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              {emailError && <ExclamationMark />}
            </EmailInputBox>
            {emailError && (
              <ErrorMsg>The email is not a valid email address.</ErrorMsg>
            )}
          </EmailContainer>
          <PasswordContainer>
            <PasswordContent>
              <InputLabel>Password</InputLabel>
              <PasswordForgot>Forgot password?</PasswordForgot>
            </PasswordContent>
            <PasswordInputBox passwordError={passwordError}>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {(passwordError || passwordRegexError) && <ExclamationMark />}
            </PasswordInputBox>
            {passwordError && <ErrorMsg>Password cannot be empty.</ErrorMsg>}
            <PasswordExplanation passwordRegexError={passwordRegexError}>
              Passwords must contain at least eight characters, including at
              least 1 letter and 1 number.
            </PasswordExplanation>
          </PasswordContainer>
          <JoinButton onClick={handleJoin}>Sign up</JoinButton>
          <JoinExplanation>
            By clicking “Sign up”, you agree to our terms of service and
            acknowledge that you have read and understand our privacy policy and
            code of conduct.
          </JoinExplanation>
        </FormContainer>
        <SignUpContainer>
          Already have an account?&nbsp;
          <LinkLogin to="/Login">Log in</LinkLogin>
        </SignUpContainer>
        <SignUpContainer>
          Are you an employer?&nbsp;
          <LinkLogin to="https://talent.stackoverflow.com/users/Join">
            Sign up on Talent
          </LinkLogin>
        </SignUpContainer>
      </JoinContent>
    </JoinContainer>
  );
}

const JoinContainer = tw.div`
bg-[#F1F2F3]
w-screen h-screen
overflow-scroll
flex
justify-center
items-center
`;
const JoinExplanationContent = tw.div`
flex
flex-col
justify-center
w-[422px] h-[300px]
mr-[48px] mb-[123px]
`;
const ExplanationTitle = tw.h1`
flex
text-[26px]
mb-[32px]
`;
const Explanation = tw.div`
mb-[24px]
flex
`;
const ExplanationSmall = tw.div`
text-[13px] text-[#6a737c]
`;
const ExplanationSmallLink = tw.a`
text-[13px] text-[#0074cc]
`;
const JoinContent = tw.div`
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
const FormContainer = tw.div`
w-[300px] h-[900px]
bg-white
flex
flex-col
justify-center
items-center
mb-[24px]
shadow-[0px_10px_24px_#0000000d]
rounded-[5px]
p-[24px]
`;
const NameContainer = tw.div`
flex
flex-col
my-[6px]
`;
const NameInputBox = tw.div<{ nameError: boolean }>`
my-[2px]
border-solid border 
${(props) => (props.nameError ? "border-[#de4f54]" : "border-[#BABFC4]")}
w-[256px] h-[30px]
rounded-[3px]
flex
items-center`;
const PhoneContainer = tw.div`
flex
flex-col
my-[6px]
`;
const PhoneInputBox = tw.div<{ phoneError: boolean }>`
my-[2px]
border-solid border 
${(props) => (props.phoneError ? "border-[#de4f54]" : "border-[#BABFC4]")}
w-[256px] h-[30px]
rounded-[3px]
flex
items-center`;
const BirthdayContainer = tw.div`
flex
flex-col
my-[6px]
`;
const BirthdayInputBox = tw.div<{ birthdayError: boolean }>`
my-[2px]
border-solid border
${(props) => (props.birthdayError ? "border-[#de4f54]" : "border-[#BABFC4]")}
w-[256px] h-[30px]
rounded-[3px]
flex
items-center`;
const EmailContainer = tw.div`
flex
flex-col
my-[6px]
`;
const InputLabel = tw.label`
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
const PasswordExplanation = tw.div<{ passwordRegexError: boolean }>`
w-[256px]
text-[13px] 
${(props) => (props.passwordRegexError ? "text-[#de4f54]" : "text-[#6a737c]")}
`;
const Input = tw.input`
outline-none
w-[230px] h-[100%]
text-[12px]
py-[7.8px] pl-[9.1px]
`;
const JoinButton = tw.button`
bg-[#0a95ff]
my-[6px]
w-[256px] h-[37px]
text-white text-[12px]
rounded-[3px]

hover:bg-[#0063bf]
`;
const JoinExplanation = tw.div`
w-[256px]
text-[13px] text-[#6a737c]
mt-[32px]
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
const LinkLogin = tw(Link)`
text-[#0074cc]
`;
const ErrorMsg = tw.p`
text-[#de4f54] text-[11px]
`;
