import tw from "tailwind-styled-components";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Main = () => {
  return (
    <>
      <Mainheader></Mainheader>
      <DataCard></DataCard>
    </>
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
        <Filter>Ask Question</Filter>
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

const DataCard = () => {
  return (
    <StyledCard>
      <Shortinfo>
        <p>0 votes</p>
        <p>0 answers</p>
        <p>3 views</p>
      </Shortinfo>
      <div>
        <Styledtitle>
          Connection timeout connecting to Redis Docker container on another
          host
        </Styledtitle>
        <Styledcontent>
          I have a Redis cluster (containerised) on my host 10.20.80.200, and
          I'm trying to connect to it on another host with an IP of
          10.20.80.201. I keep getting a 'Connection timeout' error on my
          10.20.80....
        </Styledcontent>
        <Styledbottom>
          <div>Spring-boot docker docker-compose redis</div>
          <div>Ben whitely 47asked 1min ago</div>
        </Styledbottom>
      </div>
    </StyledCard>
  );
};

const Styledbottom = tw.div`
flex
mt-[10px]
gap-[150px]
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
ml-[5px]
  
`;

const StyledHeader = tw.div`
relative
top-1/2
left-1/4
flex
gap-[400px]
border-[rgb(95,148,233)]
border-solid
border-[1px]
w-[850px]
h-[130px]
p-[10px]
`;
const StyledCard = tw(StyledHeader)`
gap-[40px]
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
