import { Link } from "react-router-dom";
import Pagenation from "../components/Pagenation";
import Footer from "../components/Footer";
import tw from "tailwind-styled-components";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NavMenu from "../components/NavMenu";
import SideMenu from "../components/SideMenu";

interface DataItem {
  id: number;
  votes: number;
  answers: number;
  views: number;
  title: string;
  content: string;
  infoname: string;
  reputation: number;
  date: Date;
}

interface Props {
  data: DataItem[];
  i: number;
}
const Main = () => {
  const dummydata: DataItem[] = [
    {
      id: Math.random(),
      votes: 0,
      answers: 0,
      views: 3,
      title:
        "Connection timeout connecting to Redis Docker container on another host",
      content:
        " I have a Redis cluster (containerised) on my host 10.20.80.200, and I'm trying to connect to it on another host with an IP of 10.20.80.201. I keep getting a 'Connection timeout' error on my10.20.80....",
      infoname: "Ben Whitely",
      reputation: 3,
      date: new Date("2023-06-20 14:00:05"),
    },
    {
      id: Math.random(),
      votes: 2,
      answers: 5,
      views: 3,
      title: "순수 테스트용입니다1.",
      content:
        " I have a Redis cluster (containerised) on my host 10.20.80.200, and I'm trying to connect to it on another host with an IP of 10.20.80.201. I keep getting a 'Connection timeout' error on my10.20.80....",
      infoname: "Ben Whitely",
      reputation: 3,
      date: new Date("2023-06-19 14:00:05"),
    },
    {
      id: Math.random(),
      votes: 2,
      answers: 5,
      views: 3,
      title: "순수 테스트용입니다2.",
      content:
        " I have a Redis cluster (containerised) on my host 10.20.80.200, and I'm trying to connect to it on another host with an IP of 10.20.80.201. I keep getting a 'Connection timeout' error on my10.20.80....",
      infoname: "Ben Whitely",
      reputation: 3,
      date: new Date("2023-06-19 14:00:05"),
    },
    {
      id: Math.random(),
      votes: 2,
      answers: 5,
      views: 3,
      title: "순수 테스트용입니다3.",
      content:
        " I have a Redis cluster (containerised) on my host 10.20.80.200, and I'm trying to connect to it on another host with an IP of 10.20.80.201. I keep getting a 'Connection timeout' error on my10.20.80....",
      infoname: "Ben Whitely",
      reputation: 3,
      date: new Date("2023-06-19 14:00:05"),
    },
    {
      id: Math.random(),
      votes: 2,
      answers: 5,
      views: 3,
      title: "순수 테스트용입니다4.",
      content:
        " I have a Redis cluster (containerised) on my host 10.20.80.200, and I'm trying to connect to it on another host with an IP of 10.20.80.201. I keep getting a 'Connection timeout' error on my10.20.80....",
      infoname: "Ben Whitely",
      reputation: 3,
      date: new Date("2023-06-19 05:00:05"),
    },
  ];

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
          <Mainheader></Mainheader>
          <div style={{ position: "absolute", top: "0px", left: "90px" }}>
            <NavMenu></NavMenu>
          </div>
          {dummydata.map((item, i) => {
            return (
              <div>
                <DataCard data={dummydata} i={i}></DataCard>
              </div>
            );
          })}

          <div style={{ position: "absolute", right: "100px" }}>
            <Pagenation></Pagenation>
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

const Mainheader = () => {
  return (
    <StyledHeader>
      <StyledHeaderRL>
        <h2>All Questions</h2>
        <div>23,753,867 questions</div>
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
  const getMinutes = (postDate: Date): string => {
    const currentDate: Date = new Date();
    const timeDiffMinutes: number = Math.round(
      (currentDate.getTime() - postDate.getTime()) / (1000 * 60)
    );

    if (timeDiffMinutes < 1) {
      return "just before";
    } else if (timeDiffMinutes < 60) {
      return `${timeDiffMinutes}min ago`;
    } else if (timeDiffMinutes < 1440) {
      const hours: number = Math.floor(timeDiffMinutes / 60);
      return `${hours}hour ago `;
    } else {
      const days: number = Math.floor(timeDiffMinutes / 1440);
      return `${days}days ago`;
    }
  };

  console.log(data);
  return (
    <StyledCard>
      <Shortinfo>
        <p>{data[i].votes} votes</p>
        <p>{data[i].answers} answers</p>
        <p>{data[i].views} views</p>
      </Shortinfo>
      <div>
        <Styledtitle>{data[i].title}</Styledtitle>
        <Styledcontent>{data[i].content}</Styledcontent>
        <Styledbottom>
          <div className="tag">
            <Styledtag>Spring-boot</Styledtag> <Styledtag>docker</Styledtag>{" "}
            <Styledtag>docker-compose</Styledtag>
          </div>
          <Questioninfo>
            <p>name</p>
            <p>5 asked</p>
            <p>{getMinutes(data[i].date)}</p>
          </Questioninfo>
        </Styledbottom>
      </div>
    </StyledCard>
  );
};

const Questioninfo = tw.div`
flex
gap-[10px]
ml-auto
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
mt-[10px]
justify-between 
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
