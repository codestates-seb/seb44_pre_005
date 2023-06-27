import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import preApi from "../api/preApi";
import NavMenu from "../components/NavMenu";
import SideMenu from "../components/SideMenu";
import Footer from "../components/Footer";
import tw from "tailwind-styled-components";

interface Answer {
  content: string;
}

export default function AnswerModifyDetail() {
  const { id } = useParams() as { id: string };
  const [answer, setAnswer] = useState<Answer>({ content: "" });
  const [text, setText] = useState(answer.content);
  const navigate = useNavigate();
  const cookie = document.cookie.split(";");
  const access = cookie[0].split("=")[1];
  const refresh = cookie[1].split("=")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await preApi.getAnswerModify(id);
        const json = await response.json();
        setAnswer(json.data);
        setText(json.data.content);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleEdit = async () => {
    try {
      const questionId = "1";
      const data = { questionId, content: text };
      const response = await preApi.updateAnswer(id, data, access, refresh);
      console.log(response);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <Container>
        <NavMenu />
        <AnswerModifyDetailForm>
          <AnswerContainer>
            <Answer>Answer</Answer>
            <AnswerInputBox>
              <AnswerInput
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></AnswerInput>
            </AnswerInputBox>
          </AnswerContainer>
          <ButtonContainer>
            <SaveButton onClick={handleEdit}>Save edits</SaveButton>
            <CancelLink to={`/detail/${id}`}>Cancel</CancelLink>
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
