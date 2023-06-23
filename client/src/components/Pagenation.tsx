import tw from "tailwind-styled-components";

interface PagenationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalquestion: number;
}

const Pagenation: React.FC<PagenationProps> = ({
  page,
  setPage,
  totalquestion,
}) => {
  const numPages = Math.ceil(totalquestion / 15);
  return (
    <Nav>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {Array(numPages)
        .fill(null)
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-selected={page === i + 1}
          >
            {i + 1}
          </Button>
        ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
    </Nav>
  );
};

export default Pagenation;

const Nav = tw.nav`
flex
justify-center
items-center
gap-[4px]
m-[16px]
`;

const Button = tw.button`
border-none
rounded-lg
p-[8px]
m-0
bg-black
text-white
text-xs
aria-selected:text-amber-300
`;
