import React from "react";
import { Link } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import tw from "tailwind-styled-components";

export default function ModifyDetail() {
  return (
    <>
      <Container>
        <NavMenu />
        <ModifyDetailForm>
          <TitleContainer>
            <Title>Title</Title>
            <TitleInputBox>
              <TitleInput></TitleInput>
            </TitleInputBox>
          </TitleContainer>
          <BodyContainer>
            <Body>Body</Body>
            <BodyInputBox>
              <BodyInput></BodyInput>
            </BodyInputBox>
          </BodyContainer>
          <ButtonContainer>
            <SaveButton>Save edits</SaveButton>
            <CancelLink to="/detail/">Cancel</CancelLink>
          </ButtonContainer>
        </ModifyDetailForm>
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
const ModifyDetailForm = tw.div`
flex flex-col
w-[950px]
p-[24px]
`;
const TitleContainer = tw.div`
w-[100%]
pb-[15px]
`;
const Title = tw.div`
text-[18px] font-semibold	
m-[4px]
`;
const TitleInputBox = tw.div`
border border-solid border-[#BABFC4]
w-[900px] h-[32px]
py-[0.6px] pl-[9.1px]
`;
const TitleInput = tw.input`
w-[100%] h-[100%]
outline-none
`;
const BodyContainer = tw.div`
w-[100%]
pb-[15px]
`;
const Body = tw.div`
text-[18px] font-semibold	
m-[4px]
`;
const BodyInputBox = tw.div`
border border-solid border-[#BABFC4]
w-[900px] h-[200px]
`;
const BodyInput = tw.textarea`
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
