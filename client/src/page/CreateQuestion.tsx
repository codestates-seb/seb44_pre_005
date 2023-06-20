import tw from "tailwind-styled-components";
import { useState } from "react";

//todo: codeSyntaxHighlight or backgroundcolor grey
//todo: valid test (통합 ? useEffect?)
//todo: 스타일 적용

const CreateQuestion = () => {
  const [invalid, setInvalid] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [bodyInvalid, setBodyInvalid] = useState(false);
  const [bodyModal, setBodyModal] = useState(false);
  const [valid, setvalid] = useState(false);

  const titleBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleModal(false);
    if (event.target.value === "") {
      console.log("잘못입력햇다.");
      setInvalid(true);
    } else setInvalid(false);
  };

  const titleOnchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setInvalid(true);
    } else setInvalid(false);
  };

  const titleFocusHandler = () => {
    setTitleModal(true);
  };

  const bodyOnchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 20) {
      setBodyInvalid(true);
    } else setBodyInvalid(false);
  };

  const bodyBlurHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBodyModal(false);
    if (event.target.value.length < 20) {
      setBodyInvalid(true);
    } else setBodyInvalid(false);
  };

  const bodyFocusHandler = () => {
    setBodyModal(true);
  };

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("제출되었습니다.");
  };
  return (
    <StyledForm onSubmit={onSubmitHandler}>
      <StyledFlex>
        <h2>Ask a public question</h2>
        <img src={process.env.PUBLIC_URL + "/2023-06-18 15 46 02.png"}></img>
      </StyledFlex>
      <StyledBox>
        <Styledtitle text="20">Writing a good question</Styledtitle>
        <Explaincontent>
          <p>
            You're ready to{" "}
            <StyledLink href="https://stackoverflow.com/help/how-to-ask">
              ask
            </StyledLink>{" "}
            a{" "}
            <StyledLink href="https://stackoverflow.com/help/on-topic">
              programming-related question
            </StyledLink>{" "}
            and this form will help guide you through the process.
          </p>
        </Explaincontent>
        <p>
          Looking to ask a non-programming question? See{" "}
          <StyledLink href="https://stackexchange.com/sites#technology">
            the topics here
          </StyledLink>{" "}
          to find a relevant site
        </p>
        <br></br>
        <h1>Steps</h1>
        <Explaincontent>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>
            Add “tags” which help surface your question to members of the
            community.
          </li>
          <li>Review your question and post it to the site.</li>
        </Explaincontent>
      </StyledBox>
      <Wholeform>
        <Inputform>
          <Styledtitle text="10">Title</Styledtitle>
          <label>
            Be specific and imagine you’re asking a question to another person.
          </label>
          <div className="title-input-form">
            <Titleinput
              invalid={invalid}
              type="text"
              placeholder="e.g Is there an R funcction for finding the index of an element in a vector?"
              onBlur={titleBlurHandler}
              onChange={titleOnchangeHandler}
              onFocus={titleFocusHandler}
            ></Titleinput>
            {invalid && <Redcolor>제목을 입력해주세요!</Redcolor>}
          </div>
        </Inputform>
        {titleModal && <TitleModal></TitleModal>}
      </Wholeform>
      <Wholeform>
        <Bodyform>
          <Styledtitle text="20">
            What are the details of your problem?
          </Styledtitle>
          <p>
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </p>
          <div className="body-input-form">
            <Bodyinput
              invalid={bodyInvalid}
              onFocus={bodyFocusHandler}
              onBlur={bodyBlurHandler}
              onChange={bodyOnchangeHandler}
            ></Bodyinput>
            {bodyInvalid && <Redcolor>20자 이상 입력해주세요!</Redcolor>}
            <Submitbutton type="submit" disabled={valid ? false : true}>
              Submit
            </Submitbutton>
            <Cancelbutton className="cancel-button">Cancel</Cancelbutton>
          </div>
        </Bodyform>
        {bodyModal && <BodyModal></BodyModal>}
      </Wholeform>
    </StyledForm>
  );
};

const TitleModal = () => {
  return (
    <Titlemodal>
      <Modaltitle>
        <h2>Writing a good title</h2>
      </Modaltitle>
      <Modalbody>
        <img src={process.env.PUBLIC_URL + "/pencil.png"}></img>
        <div>
          <p>Your title should summarize the problem.</p>
          <br></br>
          <p>You might find that you have a better idea </p>
          <p>of your title afterwriting out the rest of the</p>
          <p>question.</p>
        </div>
      </Modalbody>
    </Titlemodal>
  );
};

const BodyModal = () => {
  return (
    <Titlemodal>
      <Modaltitle>
        <h2>Introduce the problem</h2>
      </Modaltitle>
      <Modalbody>
        <img src={process.env.PUBLIC_URL + "/pencil.png"}></img>
        <div>
          <p>Explain how you encountered the problem</p>
          <p>you’re trying to solve, and any difficulties that </p>
          <p>have prevented you from solving it yourself.</p>
        </div>
      </Modalbody>
    </Titlemodal>
  );
};

export default CreateQuestion;

const Redcolor = tw.div`
text-red-600
`;

const Margin = tw.div`
    mt-[10px]
`;

const StyledForm = tw.form`
    ml-[310px]
    mt-[10px]
    
`;

const StyledFlex = tw.div`
    flex
    gap-[400px]
    h2{
        text-[30px]
    }
`;

const StyledBox = tw.div`
    bg-[rgb(235,244,251)]
    border-[rgb(95,148,233)]
    border-solid
    border-[1px]
    rounded-sm
    w-[950px]
    p-[30px]
    
`;

const Styledtitle = tw.h2<{ text: string }>`
t-[${(props) => props.text}px]
`;

const StyledLink = tw.a`
text-sky-600
hover:text-sky-500
`;

const Explaincontent = tw(Margin)`
    t-[15px]
`;

const Wholeform = tw.div`
    flex
    
`;

const Inputform = tw.div`
w-[950px]
h-[130px]
border-[1px]
border-solid
border-[rgb(183, 215, 240);]
p-[24px]
mt-[10px]
    
`;

const Bodyform = tw(Inputform)`
  h-[200px]
`;

const Titlemodal = tw.div`
    h-[50px]
    ml-[20px]
    mt-[10px]
`;

const Modaltitle = tw.div`
    border-[1px]
    border-solid
    border-[border-right: 1px solid rgb(183, 215, 240);]
    p-[10px]
`;

const Modalbody = tw.div`
    flex
    p-[10px]
    border-[1px]
    border-solid
    border-[border-right: 1px solid rgb(183, 215, 240);]
    gap-[10px]
    t-[12px]
`;

const Titleinput = tw.input<{ invalid: boolean }>`
    w-[900px]
    h-[30px]
    p-[5px]
    rounded-[5px]
    border-[1px]
    border-solid
    focus:outline-none
    ${(props) => (props.invalid ? "border-[#de4f54]" : "border-[#BABFC4]")}
`;

const Bodyinput = tw(Titleinput)`
  h-[140px]
`;

const Submitbutton = tw.button`
rounded-t
border-solid
border-[1px]
p-[10px]
mt-[10px]
bg-blue-600
shadow-blue-500/10
hover:bg-blue-950
`;

const Cancelbutton = tw.button`
rounded-t
border-solid
border-[1px]
p-[10px]
mt-[10px]
ml-[15px]
bg-rose-700
drop-shadow-2xl
hover:bg-rose-950
`;
