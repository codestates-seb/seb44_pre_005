import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import preApi from "../api/preApi";
import SideMenu from "../components/SideMenu";
import tw from "tailwind-styled-components";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import { MdBookmarkBorder, MdHistory } from "react-icons/md";

type Question = {
  answer: number;
  content: string;
  dateCreated: string;
  dataModified: string;
  member: Member;
};
type Answer = {
  answerId: number;
  content: string;
  dateCreated: string;
  dataModified: string;
  member: Member;
};
type Member = {
  email: string;
  memeberId: number;
  name: string;
  phone: string;
};

export default function Detail() {
  const { id } = useParams();
  const [questionInfo, setQuestionInfo] = useState<Question>({
    answer: 1,
    content: "",
    dateCreated: "",
    dataModified: "",
    member: {
      email: "",
      memeberId: 1,
      name: "",
      phone: "",
    },
  });
  const [answerInfo, setAnswerInfo] = useState<Answer[]>([]);
  const getQuestion = async (id = "1") => {
    const response = await preApi.getQuestion(id);
    const json = await response.json();
    setQuestionInfo(json.data);
  };
  const getAnswers = async () => {
    const response = await preApi.getAnswer();
    const json = await response.json();
    console.log(json.data);
    setAnswerInfo(json.data);
  };
  const getTime = (createdTime = ""): string => {
    const currentTime = Date.now();
    const targetTime = new Date(createdTime).getTime();
    const minutesDifference = Math.floor(
      (currentTime - targetTime) / (1000 * 60)
    );

    if (minutesDifference < 1) {
      return "now";
    } else if (minutesDifference < 60) {
      return `${minutesDifference} min ago`;
    } else if (minutesDifference < 1440) {
      return `${Math.floor(minutesDifference / 60)} min ago`;
    }
    return `${Math.floor(minutesDifference / 1440)} days ago`;
  };
  useEffect(() => {
    getQuestion(id);
    // getAnswers();
  }, []);
  useEffect(() => {
    getQuestion(id);
    // getAnswers();
  }, []);

  return (
    <Container>
      <NavMenu />
      <DetailContainer>
        <TitleContainer>
          <TitleInfo>
            <Title>
              RegEx match open tags except XHTML self-contained tags
            </Title>
            Asked 13 years, 7 months ago Modified 3 months ago Viewed 3.6m times
          </TitleInfo>
          <div>
            <Link to="/create">
              <Ask>Ask Question</Ask>
            </Link>
          </div>
        </TitleContainer>
        <ContentContainer>
          <Content>
            <QustionContainer>
              <RemoteContainer>
                <ArrowContainer>
                  <RiArrowUpSFill />
                </ArrowContainer>
                <LikeP>2</LikeP>
                <ArrowContainer>
                  <RiArrowDownSFill />
                </ArrowContainer>
                <EtcEmoji>
                  <MdBookmarkBorder />
                </EtcEmoji>
                <EtcEmoji>
                  <MdHistory />
                </EtcEmoji>
              </RemoteContainer>
              <QuestionContent>
                <p>{questionInfo.content}</p>
                <QuestionInfo>
                  <EditQustion>
                    <EditP>Share</EditP>
                    <EditP>Follow</EditP>
                    <Link to="/modifydetail/1">
                      <EditP>Edit</EditP>
                    </Link>
                    <EditP>delete</EditP>
                  </EditQustion>
                  <WriterContainer>
                    <p>asked {getTime(questionInfo.dateCreated)}</p>
                    <WriterInfo className="flex">
                      <img
                        src="https://www.gravatar.com/avatar/57557ba32e0e125eff0f2b39bd710c5b?s=64&d=identicon&r=PG"
                        width={32}
                        height={32}
                      />
                      <WriterP>{questionInfo.member.name}</WriterP>
                    </WriterInfo>
                  </WriterContainer>
                </QuestionInfo>
              </QuestionContent>
            </QustionContainer>
            <AnswerContainer>
              <NumAnswers>{answers.length} Answers</NumAnswers>
              {answers.map((ele) => {
                const reply = replys.filter((rep) => rep.answer_id === ele.id);
                return (
                  <AnswerContent key={ele.id}>
                    <AnswerInfo>
                      <RemoteContainer>
                        <ArrowContainer>
                          <RiArrowUpSFill />
                        </ArrowContainer>
                        <LikeP>{ele.like}</LikeP>
                        <ArrowContainer>
                          <RiArrowDownSFill />
                        </ArrowContainer>
                        <EtcEmoji>
                          <MdBookmarkBorder />
                        </EtcEmoji>
                        <EtcEmoji>
                          <MdHistory />
                        </EtcEmoji>
                      </RemoteContainer>
                      <QuestionContent>
                        <p>{ele.answer}</p>
                        <QuestionInfo>
                          <EditQustion>
                            <EditP>Share</EditP>
                            <EditP>Follow</EditP>
                            <Link to="/answermodify/1">
                              <EditP>Edit</EditP>
                            </Link>
                            <EditP>delete</EditP>
                          </EditQustion>
                          <AnswererContainer>
                            <p>answered 5hours</p>
                            <WriterInfo className="flex">
                              <img src={ele.img} width={32} height={32} />
                              <WriterP>{ele.nickname}</WriterP>
                            </WriterInfo>
                          </AnswererContainer>
                        </QuestionInfo>
                      </QuestionContent>
                    </AnswerInfo>
                    {reply.length !== 0 && (
                      <CommentContaier key={ele.id}>
                        {reply.map((rp) => {
                          return (
                            <CommentInner key={rp.id}>
                              <CommentLike>
                                <p>1</p>
                              </CommentLike>
                              <Comment key={rp.id}>
                                {rp.content} -
                                <CommentWriter> {rp.nickname}</CommentWriter>
                                <CommentDate> {rp.date}</CommentDate>
                              </Comment>
                            </CommentInner>
                          );
                        })}
                      </CommentContaier>
                    )}
                    <AddComment>Add a Comment</AddComment>
                  </AnswerContent>
                );
              })}
            </AnswerContainer>
            <AddAnswerContiner>
              <NumAnswers>Your Answer</NumAnswers>
              <AddAnswer></AddAnswer>
              <AddAnswerBtn>Post Your Answer</AddAnswerBtn>
            </AddAnswerContiner>
          </Content>
          <SideMenu />
        </ContentContainer>
      </DetailContainer>
    </Container>
  );
}

const Container = tw.div`
flex
mx-28
`;
const DetailContainer = tw.div`
w-[calc(100%-160px)] min-w-[900px]
border-l border-[#D6D9DC]
p-6
`;
const TitleContainer = tw.div`
flex justify-between
border-b border-[#D6D9DC]
pb-4
mb-4
`;
const TitleInfo = tw.div`
text-sm
`;
const Title = tw.p`
text-[27px]
mb-1
`;
const Ask = tw.p`
bg-[#0A95FF]
p-3
text-sm text-white
rounded
`;
const ContentContainer = tw.div`
flex
`;
const Content = tw.div`
w-[calc(100%-300px)]
mr-8
`;
const QustionContainer = tw.div`
flex
pr-4
`;
const RemoteContainer = tw.div`
flex flex-col
text-center
mr-4
py-1
`;
const ArrowContainer = tw.div`
border-[1px]
border-[#D6D9DC] 
rounded-full
text-3xl
p-1
hover:bg-[#FCE3CA] hover:cursor-pointer
`;
const LikeP = tw.p`
my-2
`;
const EtcEmoji = tw.div`
text-xl text-[#BABFC4]
mx-auto mt-2
`;
const QuestionContent = tw.div`
w-full
`;
const QuestionInfo = tw.div`
mt-4
flex
justify-between
`;
const EditQustion = tw.div`
flex
text-sm
`;
const EditP = tw.div`
m-1
cursor-pointer
text-[#6A737C]
`;
const WriterContainer = tw.div`
w-40
p-2
text-xs text-[#6A737C]
bg-[#D9EAF7]
`;
const WriterInfo = tw.div`
pt-2
`;
const WriterP = tw.p`
ml-2
text-[#0074E0]
`;
const AnswerContainer = tw.div`
pt-3
`;
const NumAnswers = tw.p`
text-xl
`;
const AnswerContent = tw.div`
my-8
pb-4 pr-4
border-b-[1px]
border-[#D6D9DC]
`;
const AnswerInfo = tw.div`
flex
`;
const AnswererContainer = tw(WriterContainer)`
bg-white
`;
const CommentContaier = tw.div`
border-t-[1px]
border-[#D6D9DC]
ml-14
mt-12
`;
const CommentInner = tw.div`
flex
text-xs
p-2
pl-0
border-b-[1px]
border-[#D6D9DC]
`;
const CommentLike = tw.div`
pr-4
`;
const Comment = tw.p`
text-xs
`;
const CommentWriter = tw.span`
text-[#0074E0]
`;
const CommentDate = tw.span`
text-gray-400
`;
const AddComment = tw.p`
ml-14
mt-4
text-gray-400
text-xs
cursor-pointer
inline-block
`;
const AddAnswerContiner = tw.div`
  
`;
const AddAnswer = tw.textarea`
mt-8
p-4
w-full
h-80
border-[1px]
border-black
`;
const AddAnswerBtn = tw(Ask)`
mt-8
cursor-pointer
inline-block
`;

const userList = {
  img: "https://i.stack.imgur.com/I4fiW.jpg?s=128&g=1",
  name: "VonC",
  birthday: "199701",
};

const answers = [
  {
    id: 1,
    nickname: "hilmi ugur",
    img: "https://www.gravatar.com/avatar/57557ba32e0e125eff0f2b39bd710c5b?s=64&d=identicon&r=PG",
    answer: `Yes, you can query a running container to see which logging driver it is using. The information about the logging driver is available in the container's metadata. You can use the docker inspect command with a specific format option to extract the logging driver information.

  docker inspect -f '{{.HostConfig.LogConfig.Type}}' <container_id>`,
    like: 3,
  },
  {
    id: 2,
    nickname: "hilmi ugur",
    img: "https://www.gravatar.com/avatar/57557ba32e0e125eff0f2b39bd710c5b?s=64&d=identicon&r=PG",
    answer: `Yes, you can query a running container to see which logging driver it is using. The information about the logging driver is available in the container's metadata. You can use the docker inspect command with a specific format option to extract the logging driver information.

  docker inspect -f '{{.HostConfig.LogConfig.Type}}' <container_id>`,
    like: 3,
  },
  {
    id: 3,
    nickname: "hilmi ugur",
    img: "https://www.gravatar.com/avatar/57557ba32e0e125eff0f2b39bd710c5b?s=64&d=identicon&r=PG",
    answer: `Yes, you can query a running container to see which logging driver it is using. The information about the logging driver is available in the container's metadata. You can use the docker inspect command with a specific format option to extract the logging driver information.

  docker inspect -f '{{.HostConfig.LogConfig.Type}}' <container_id>`,
    like: 3,
  },
];

const replys = [
  {
    id: 1,
    answer_id: 1,
    nickname: "H1",
    content: `Apache has the LimitRequestBody & LimitRequestFieldSize directives too, not always safe to assume it's restricted by just PHP`,
    date: "Feb 16, 2010 at 22:33",
  },
  {
    id: 2,
    answer_id: 1,
    nickname: "H2",
    content: `I agree`,
    date: "Feb 16, 2010 at 22:33",
  },
  {
    id: 3,
    answer_id: 1,
    nickname: "H3",
    content: `Nice to see you again`,
    date: "Feb 16, 2010 at 22:33",
  },
  {
    id: 4,
    answer_id: 3,
    nickname: "hilmi ugur",
    content: `Nice to see you again`,
    date: "Feb 16, 2010 at 22:33",
  },
];
