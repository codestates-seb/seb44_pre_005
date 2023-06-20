import React from "react";
import tw from "tailwind-styled-components";
import { GoComment, GoSearch } from "react-icons/go";
import { FaPen, FaStackOverflow } from "react-icons/fa";

const SideMenu: React.FC = () => {
  return (
    <Container>
      <PostContainer>
        <ul>
          <PostTitle>The Overflow Blog</PostTitle>
          <PostContent>
            <PencilIcon>
              <FaPen />
            </PencilIcon>
            <a href="https://stackoverflow.blog/2023/06/14/hype-or-not-developers-have-something-to-say-about-ai/?cb=1">
              <p>
                Hype or not? AI’s benefits for developers explored in the 2023
                Developer Survey
              </p>
            </a>
          </PostContent>
          <PostContent>
            <PencilIcon>
              <FaPen />
            </PencilIcon>
            <a href="https://stackoverflow.blog/2023/06/16/programming-alone-we-peek-under-the-hood-of-duet-googles-coding-assistant-ep-580/?cb=1">
              <p>
                Pair programing? We peek under the hood of Duet, Google’s coding
                assistant....
              </p>
            </a>
          </PostContent>
          <PostTitle>Featured on Meta</PostTitle>
          <PostContent>
            <ColorIcon>
              <GoComment />
            </ColorIcon>
            <a href="https://meta.stackexchange.com/questions/389834/statement-from-so-june-5-2023-moderator-action?cb=1">
              <p>Statement from SO: June 5, 2023 Moderator Action</p>
            </a>
          </PostContent>
          <PostContent>
            <ColorIcon>
              <GoComment />
            </ColorIcon>
            <a href="https://meta.stackexchange.com/questions/390295/stack-exchange-network-outage-june-15-2023?cb=1">
              <p>Stack Exchange Network Outage – June 15, 2023</p>
            </a>
          </PostContent>
          <PostContent>
            <StackIcon>
              <FaStackOverflow />
            </StackIcon>
            <a href="https://meta.stackoverflow.com/questions/424910/does-the-policy-change-for-ai-generated-content-affect-users-who-want-to-flag?cb=1">
              <p>
                Does the policy change for AI-generated content affect users who
                (want to)...
              </p>
            </a>
          </PostContent>
          <PostContent>
            <StackIcon>
              <FaStackOverflow />
            </StackIcon>
            <a href="https://meta.stackoverflow.com/questions/421831/temporary-policy-generative-ai-e-g-chatgpt-is-banned?cb=1">
              <p>Temporary policy: Generative AI (e.g., ChatGPT) is banned</p>
            </a>
          </PostContent>
          <PostContent>
            <StackIcon>
              <FaStackOverflow />
            </StackIcon>
            <a href="https://meta.stackoverflow.com/questions/425162/we-are-seeking-functional-feedback-for-the-formatting-assistant?cb=1">
              <p>
                We are seeking functional feedback for the formatting assistant
              </p>
            </a>
          </PostContent>
          <PostTitle>Hot Meta Posts</PostTitle>
          <PostContent>
            <TextIcon>19</TextIcon>
            <a href="https://meta.stackoverflow.com/questions/425223/can-users-be-sanctioned-for-admitting-to-using-sos-first-party-ai-formatting?cb=1">
              <p>
                Can users be sanctioned for (admitting to) using SO's first
                party AI...
              </p>
            </a>
          </PostContent>
        </ul>
      </PostContainer>
      <FilterContainer>
        <FilterTitle>Custom Filters</FilterTitle>
        <FilterContent>Empty</FilterContent>
      </FilterContainer>
      <FilterContainer>
        <FilterTitle>Watched Tags</FilterTitle>
        <FilterContent>
          <FilterIcon>
            <GoSearch />
          </FilterIcon>
          Watch tags to curate your list of questions.
        </FilterContent>
      </FilterContainer>
      <FilterContainer>
        <FilterTitle>Ignored Tags</FilterTitle>
        <FilterContent>Empty</FilterContent>
      </FilterContainer>
      <a href="https://survey.stackoverflow.co/2023/?utm_source=house-ads&utm_medium=display&utm_campaign=dev-survey-results-2023&utm_content=survey-results">
        <img src="https://tpc.googlesyndication.com/simgad/2894417314404102158" />
      </a>
    </Container>
  );
};

export default SideMenu;

const Container = tw.div`
w-[300px]
m-6
`;

const PostContainer = tw.div`
text-[13px]
bg-[#FDF7E2]
border-[1px]
border-[#F1E5BC]
text-[#525960]
`;
const PostTitle = tw.li`
text-xs
font-bold
bg-[#FBF3D5]
px-[15px]
py-[12px]
border-y-[1px]
border-[#F1E5BC]
`;
const PostContent = tw.li`
my-[12px]
px-[16px]
flex
`;
const PencilIcon = tw.div`
text-[10px]
pr-[10px]
pt-[8px]
`;
const ColorIcon = tw.div`
text-[13px]
text-[#50A6DA]
pr-[10px]
pt-[8px]
`;
const StackIcon = tw.div`
text-[13px]
pr-[10px]
pt-[8px]
`;
const TextIcon = tw(StackIcon)`
pt-0
`;
const FilterContainer = tw.div`
border-[1px]
border-[#D6D9DC]
my-4
rounded-sm
`;
const FilterTitle = tw.div`
bg-[#F8F9F9]
text-[#525960]
text-sm
py-3.5
px-4
`;
const FilterContent = tw.div`
py-3.5
px-10
text-sm
text-center
`;
const FilterIcon = tw.div`
text-4xl
mx-auto
w-10
mb-3.5
`;
