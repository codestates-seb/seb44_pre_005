import tw from "tailwind-styled-components";

function Footer() {
  const stackoverflowMenu = [
    ["https://stackoverflow.com/questions", "Questions"],
    ["https://stackoverflow.com/help", "Help"],
  ];
  const productsMenu = [
    ["https://stackoverflow.co/teams/", "Teams"],
    ["https://stackoverflow.co/advertising/", "Advertising"],
    ["https://stackoverflow.co/collectives/", "Collectives"],
    ["https://stackoverflow.co/talent/", "Talent"],
  ];
  const companyMenu = [
    ["https://stackoverflow.co/", "About"],
    ["https://stackoverflow.co/company/press", "Press"],
    ["https://stackoverflow.co/company/work-here", "Work Here"],
    ["https://stackoverflow.com/legal/terms-of-service", "Legal"],
    ["https://stackoverflow.com/legal/privacy-policy", "Privacy Policy"],
    ["https://stackoverflow.com/legal/terms-of-service", "Terms of Service"],
    ["https://stackoverflow.co/company/contact", "Contact Us"],
    ["https://stackoverflow.com/legal/cookie-policy", "Cookie Settings"],
    ["https://stackoverflow.com/legal/cookie-policy", "Cookie Policy"],
  ];
  const stackexchangenetworkMenu = [
    ["https://stackexchange.com/sites#technology", "Technology"],
    [
      "https://stackexchange.com/sites#culturerecreation",
      "Culture & recreation",
    ],
    ["https://stackexchange.com/sites#lifearts", "Life & arts"],
    ["https://stackexchange.com/sites#science", "Science"],
    ["https://stackexchange.com/sites#professional", "Professional"],
    ["https://stackexchange.com/sites#business", "business"],
    ["https://api.stackexchange.com/", "API"],
    ["https://data.stackexchange.com/", "Data"],
  ];
  const snsMenu = [
    [
      "https://www.notion.so/codestates/dd89cd973db740f9b51dfd2d2b2e3730",
      "Notion",
    ],
    ["https://github.com/codestates-seb/seb44_pre_005", "Github"],
  ];
  return (
    <>
      <Footerbox>
        <StyledContnet>
          <div className="footer-logo">
            <Img
              src={
                process.env.PUBLIC_URL +
                "/Stack_Overflow_icon-icons.com_66761.png"
              }
            ></Img>
          </div>
          <div className="footer-menu1">
            <h5>STACK OVERFLOW</h5>
            <StyledUl>
              {stackoverflowMenu.map((el) => (
                <StyledList key={el[1]}>
                  <StyledLink href={el[0]}>{el[1]}</StyledLink>
                </StyledList>
              ))}
            </StyledUl>
          </div>
          <div className="footer-menu2">
            <h5>PRODUCTS</h5>

            <StyledUl>
              {productsMenu.map((el) => (
                <StyledList key={el[1]}>
                  <StyledLink href={el[0]}>{el[1]}</StyledLink>
                </StyledList>
              ))}
            </StyledUl>
          </div>
          <div className="footer-menu3">
            <h5>COMPANY</h5>
            <StyledUl>
              {companyMenu.map((el) => (
                <StyledList key={el[1]}>
                  <StyledLink href={el[0]}>{el[1]}</StyledLink>
                </StyledList>
              ))}
            </StyledUl>
          </div>
          <div className="footer-menu4">
            <h5>STACK EXCHANGE NETWORK</h5>
            <StyledUl>
              {stackexchangenetworkMenu.map((el) => (
                <StyledList key={el[1]}>
                  <StyledLink href={el[0]}>{el[1]}</StyledLink>
                </StyledList>
              ))}
            </StyledUl>
          </div>
          <StyledFooter>
            <FooterUl>
              {snsMenu.map((el) => (
                <Footerli key={el[1]}>
                  <StyledLink href={el[0]}>{el[1]}</StyledLink>
                </Footerli>
              ))}
            </FooterUl>
            <p>
              Site design/logo © 2023 Stack Exchange Inc; user contributions
              licensed under CC BY-SA. rev 2023.4.13.4387
            </p>
          </StyledFooter>
        </StyledContnet>
      </Footerbox>
    </>
  );
}

export default Footer;

const Footerbox = tw.div`
z-5
bg-[#232629]
flex
gap-2.5
bottom-0
w-full
text-whitesmoke
justify-center
`;

const Img = tw.img`
w-44
h-44
`;

const StyledUl = tw.ul`
m-0
p-0
list-none
`;

const StyledList = tw.li`
my-[4px]
`;

const StyledLink = tw.a`
no-underline
text-[#80878e]
hover:text-neutral-950
`;

const StyledContnet = tw.div`
m-0
flex
w-[1250]
text-13
justify-around
my-[22px]
gap-[100px]
`;

const StyledFooter = tw.div`
mt-[-22px]
flex
text-11
justify-between
flex-col
w-30
text-[#80878e]
`;

const FooterUl = tw.ul`
my-22
flex
gap-[20px]
`;

const Footerli = tw.li`
inline
my-3
`;
