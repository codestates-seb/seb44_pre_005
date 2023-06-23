import React from "react";
import { Link } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import tw from "tailwind-styled-components";

export default function AnswerModifyDetail() {
  return (
    <>
      <Container>
        <NavMenu />
        <AnswerModifyDetailForm>
          <AnswerContainer>
            <Answer>Answer</Answer>
            <AnswerInputBox>
              <AnswerInput></AnswerInput>
            </AnswerInputBox>
          </AnswerContainer>
          <ButtonContainer>
            <SaveButton>Save edits</SaveButton>
            <CancelLink to="/detail/">Cancel</CancelLink>
          </ButtonContainer>
        </AnswerModifyDetailForm>
        <SideMenu />
      </Container>
      <Footer />
    </>
  );
}

const Container = tw.div`
flex
justify-center
`;
const AnswerModifyDetailForm = tw.div`
flex flex-col
w-[950px]
p-[24px]
`;
const AnswerContainer = tw.div`
w-[100%]
pb-[15px]
`;
const Answer = tw.div`
text-[18px] font-semibold	
m-[4px]
`;
const AnswerInputBox = tw.div`
border border-solid border-[#BABFC4]
w-[900px] h-[200px]
`;
const AnswerInput = tw.textarea`
w-[100%] h-[100%]
outline-none
p-[10px]
`;
const ButtonContainer = tw.div`
flex
`;
const SaveButton = tw.button`
bg-[#0a95ff]
m-[6px]
w-[80px] h-[37px]
text-white text-[12px]
rounded-[3px]

hover:bg-[#0063bf]
`;
const CancelLink = tw(Link)`
m-[6px]
w-[60px] h-[37px]
text-[#0074cc] text-[12px] text-center	
rounded-[3px]
inline-block
p-[10px]

hover:bg-[#f0f8ff]
`;
