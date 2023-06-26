import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import preApi from "../api/preApi";
import NavMenu from "../components/NavMenu";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import tw from "tailwind-styled-components";

interface Question {
  title: string;
  content: string;
}

export default function ModifyDetail() {
  const { id } = useParams() as { id: string };
  const [question, setQuestion] = useState<Question>({
    title: "",
    content: "",
  });
  const [title, setTitle] = useState(question.title);
  const [body, setBody] = useState(question.content);
  const navigate = useNavigate();
  const cookie = document.cookie.split(";");
  const access = cookie[0].split("=")[1];
  const refresh = cookie[1].split("=")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await preApi.getQuestion(id);
        const json = await response.json();
        setQuestion(json.data);
        setTitle(json.data.title);
        setBody(json.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  const handleEdit = async () => {
    try {
      const data = { title, content: body };
      const response = await preApi.updateQuestion(id, data, access, refresh);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    navigate(`/detail/${id}`);
  };
  return (
    <>
      <Container>
        <NavMenu />
        <ModifyDetailForm>
          <TitleContainer>
            <Title>Title</Title>
            <TitleInputBox>
              <TitleInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></TitleInput>
            </TitleInputBox>
          </TitleContainer>
          <BodyContainer>
            <Body>Body</Body>
            <BodyInputBox>
              <BodyInput
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></BodyInput>
            </BodyInputBox>
          </BodyContainer>
          <ButtonContainer>
            <SaveButton onClick={handleEdit}>Save edits</SaveButton>
            <CancelLink to={`/detail/${id}`}>Cancel</CancelLink>
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
