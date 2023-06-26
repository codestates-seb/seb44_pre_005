import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import preApi from "../api/preApi";
import tw from "tailwind-styled-components";
import { AiOutlineSearch } from "react-icons/ai";

type UserType = {
  memberId: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
};

const User: React.FC = () => {
  const filterList = [
    { id: 1, text: "Reputation" },
    { id: 2, text: "New users" },
    { id: 3, text: "Voters" },
    { id: 4, text: "Editors" },
    { id: 5, text: "Moderators" },
  ];
  const [users, setUsers] = useState<UserType[]>([]);
  const getUsers = async () => {
    const response = await preApi.getUserList();
    const json = await response.json();
    setUsers(json.data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <NavMenu />
      <UserContainer>
        <Title>Users</Title>
        <FilterContainer>
          <SearchBox>
            <SearchIcon>
              <AiOutlineSearch />
            </SearchIcon>
            <SearchInput type="text" placeholder="Filter by user" />
          </SearchBox>
          <FilterBox>
            {filterList.map((ele) => {
              return <BoxEle key={ele.id}>{ele.text}</BoxEle>;
            })}
          </FilterBox>
        </FilterContainer>
        <Content>
          {userList.map((people) => {
            return (
              <UserEle>
                <img src={people.img} height={48} width={48} />
                <UserInfo>
                  <UserTitle>{people.name}</UserTitle>
                  <p>{people.birthday}</p>
                </UserInfo>
              </UserEle>
            );
          })}
          {users.map((people) => {
            const url = `/User/${people.memberId}`;
            return (
              <UserEle key={people.memberId}>
                <img
                  src="https://i.stack.imgur.com/I4fiW.jpg?s=128&g=1"
                  height={48}
                  width={48}
                />
                <UserInfo>
                  <Link to={url}>
                    <UserTitle>{people.name}</UserTitle>
                  </Link>
                  <p>{people.birthday}</p>
                </UserInfo>
              </UserEle>
            );
          })}
        </Content>
      </UserContainer>
    </Container>
  );
};

export default User;

const Container = tw.div`
flex
mx-28
`;
const UserContainer = tw.div`
w-[calc(100%-10rem)] min-w-[550px]
p-6
border-l
border-[#D6D9DC]
`;
const Title = tw.h1`
text-[27px]
mb-6
`;
const FilterContainer = tw.div`
flex
justify-between
`;
const SearchBox = tw.div`
flex
p-1.5
border
border-[#BABFC4]
rounded
text-sm
`;
const SearchIcon = tw.div`
text-lg
text-[#838C95]
mr-2
`;
const SearchInput = tw.input`
w-32
`;
const FilterBox = tw.div`
flex
border-y
border-l
border-[#9FA6AD]
rounded
`;
const BoxEle = tw.p`
p-2
text-xs
text-[#6A7372]
border-r
border-[#9FA6AD]
`;
const Content = tw.div`
flex
mt-12
flex-wrap
`;
const UserEle = tw.div`
flex
p-2
mb-4
w-52
`;
const UserInfo = tw.div`
ml-2
text-xs
text-[#6A737C]
`;
const UserTitle = tw.p`
mb-2
text-base
text-[#0074CC]
`;

const userList = [
  {
    img: "https://i.stack.imgur.com/I4fiW.jpg?s=128&g=1",
    name: "VonC",
    birthday: "1997-01-01",
  },
];
