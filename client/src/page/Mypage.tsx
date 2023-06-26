import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import preApi from "../api/preApi";

type UserType = {
  memberId: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
};

const Mypage = () => {
  return (
    <Pagegrid>
      <Navgrid>
        <NavMenu></NavMenu>
      </Navgrid>
      <Contentgrid>
        <Userinfo></Userinfo>
      </Contentgrid>
      <Contentgrid>
        <Usercontent></Usercontent>
      </Contentgrid>
      <Footergrid>
        <Footer></Footer>
      </Footergrid>
    </Pagegrid>
  );
};

export default Mypage;

const Userinfo = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const params = useParams();
  const getUsers = async () => {
    const response = await preApi.getUserList();
    const json = await response.json();
    setUsers(json.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const memberid = Number(params.id);

  const memberWithmatching = users.find(
    (member) => member.memberId === memberid
  );

  console.log(memberWithmatching);

  return (
    <div>
      <Flexinfo>
        <img
          src="https://i.stack.imgur.com/I4fiW.jpg?s=128&g=1"
          height={200}
          width={200}
        />
        <div>
          <div>{memberWithmatching && memberWithmatching.name}</div>
          <Flexinfo>
            <div>
              🎂Birthday:{" "}
              {memberWithmatching &&
                memberWithmatching.birthday.substring(5, 11)}
            </div>
            <div>🧭 Last seen this week</div>
            <div>📆 Visited 12days,2 consecutive</div>
          </Flexinfo>
        </div>
        <Styledprofile>
          <div>Edit profile</div>
          <div>Profiles</div>
        </Styledprofile>
      </Flexinfo>
    </div>
  );
};

const Usercontent = () => {
  return (
    <Contentwr>
      <div>Stats</div>
      <Statsbox>
        <div>224,159</div>
        <div>16.4m</div>
      </Statsbox>
    </Contentwr>
  );
};

const Pagegrid = tw.div`
    grid
    grid-rows-[200px_minmax(900px,_1fr)_300px]
    grid-cols-[200px_auto]
`;

const Navgrid = tw.div`
fixed
ml-[20px]
`;

const Contentgrid = tw.div`
    col-start-2
    col-end-3
`;

const Footergrid = tw.div`
    col-start-1
    col-end-3
    row-start-3
    row-end-4
    
`;

const Flexinfo = tw.div`
    flex
    w-full
    p-[20px]
    gap-[20px]
`;

const Styledprofile = tw.div`
    flex
    gap-[20px]
`;

const Contentwr = tw.div`
  p-[20px]
`;

const Statsbox = tw.div`
border-[#E0E2E5]
border-solid
border-[1px]
flex

`;
