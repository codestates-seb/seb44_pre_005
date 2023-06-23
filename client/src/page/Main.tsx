import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagenation from "../components/Pagenation";
import Footer from "../components/Footer";
import tw from "tailwind-styled-components";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NavMenu from "../components/NavMenu";
import SideMenu from "../components/SideMenu";

interface Props {
  data: QuestionData[];
  i: number;
}
interface Member {
  memberId: number;
  name: string;
  email: string;
  birthday: string;
  phone: string;
}

interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  view: number;
  dateCreated: string;
  dateModified: string;
  member: Member;
  answer: number;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

interface QuestionList {
  data: QuestionData[];
  pageInfo: PageInfo;
}

interface MainHeaderProps {
  number: number;
}

const Main = () => {
  const [questionList, setQuestionList] = useState<QuestionList>({
    data: [],
    pageInfo: { page: 0, size: 0, totalElements: 0, totalPages: 0 },
  });

  const [page, setPage] = useState(1);
  const url = `https://32c6-221-148-162-66.ngrok-free.app/questions?page=${page}&size=7`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        const questions = await response.json();
        console.log(questions);
        setQuestionList(questions);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div style={{ position: "relative", minHeight: "1600px" }}>
      <div
        style={{ position: "relative", width: "1000px", marginLeft: "200px" }}
      >
        <div
          style={{
            position: "absolute",
            top: "0px",
            width: "100%",
          }}
        >
          <Mainheader number={questionList.pageInfo.totalElements}></Mainheader>
          <div style={{ position: "absolute", top: "0px", left: "90px" }}>
            <NavMenu></NavMenu>
          </div>
          {questionList.data.map((item, i) => {
            return (
              <div>
                <DataCard data={questionList.data} i={i}></DataCard>
              </div>
            );
          })}

          <div style={{ position: "absolute", right: "100px" }}>
            <Pagenation
              page={page}
              setPage={setPage}
              totalquestion={questionList.pageInfo.totalElements}
            ></Pagenation>
          </div>
        </div>
        <div style={{ position: "absolute", top: "0px", left: "1200px" }}>
          <SideMenu></SideMenu>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "0px", width: "100vw" }}>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;

const Mainheader: React.FC<MainHeaderProps> = ({ number }) => {
  return (
    <StyledHeader>
      <StyledHeaderRL>
        <h2>All Questions</h2>
        <div>{number}</div>
      </StyledHeaderRL>
      <StyledHeaderRL>
        <Link to="/create">
          <Filter>Ask Question</Filter>
        </Link>
        <div>
          <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
            <ToggleButton value="web">Newest</ToggleButton>
            <ToggleButton value="android">Active</ToggleButton>
            <ToggleButton value="ios">Unanswered</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </StyledHeaderRL>
    </StyledHeader>
  );
};

const DataCard: React.FC<Props> = ({ data, i }) => {
  const getMinutes = (): string => {
    const currentDate: Date = new Date();
    const modifiedDate = new Date(data[i].dateModified);
    const timeDifference = Math.floor(
      (currentDate.getTime() - modifiedDate.getTime()) / 60000
    );

    if (timeDifference < 1) {
      return "just before";
    } else if (timeDifference < 60) {
      return `${timeDifference}min ago`;
    } else if (timeDifference < 1440) {
      const hours: number = Math.floor(timeDifference / 60);
      return `${hours}hour ago `;
    } else {
      const days: number = Math.floor(timeDifference / 1440);
      return `${days}days ago`;
    }
  };

  const detailurl = "/detail/" + data[i].questionId;
  return (
    <StyledCard>
      <Shortinfo>
        <p>3 votes</p>
        <p>0 answers</p>
        <p>{data[i].view} views</p>
      </Shortinfo>
      <div style={{ position: "relative", left: "-250px" }}>
        <div>
          <Link to="/detail/1">
            <Link to={detailurl}>
              <Styledtitle>{data[i].title}</Styledtitle>
            </Link>
          </Link>
          <Styledcontent>{data[i].content}</Styledcontent>
        </div>
        <div></div>
        <Styledbottom>
          <div className="tag">
            <Styledtag>Spring-boot</Styledtag> <Styledtag>docker</Styledtag>{" "}
            <Styledtag>docker-compose</Styledtag>
          </div>
          <Questioninfo>
            <p>{data[i].member.name}</p>
            <p>5 asked</p>
            <p>{getMinutes()}</p>
          </Questioninfo>
        </Styledbottom>
      </div>
    </StyledCard>
  );
};

const Questioninfo = tw.div`
flex
gap-[10px]
relative
left-[240px]
`;

const Styledtag = tw.div`
bg-[#e1ecf4]
inline-block
hover:bg-[#9dd3fa]
rounded-md
p-[3px]
`;

const Styledbottom = tw.div`
flex
mt-[40px]

`;

const Styledtitle = tw.div`
text-[#5082ee]
hover:text-[#8cadf3]
text-[19px]
`;

const Styledcontent = tw.div`
text-[15px]
`;

const Shortinfo = tw.div`
flex
flex-col
w-[150px]
ml-[10px]
  
`;

const StyledHeader = tw.div`
relative
top-1/2
left-1/4
flex
justify-between 
border-[#E0E2E5]
border-solid
border-[1px]
w-[850px]
h-[130px]
p-[10px]
`;
const StyledCard = tw(StyledHeader)`
gap-[10px]
h-[155px]

`;
const StyledHeaderRL = tw.div`
flex
flex-col
gap-[20px]

`;

const Filter = tw.button`
rounded-t
border-[rgb(95,148,233)]
border-solid
border-[1px]
w-[100px]
relative
left-[180px]
bg-blue-600
text-gray-200
p-[2px]
`;
