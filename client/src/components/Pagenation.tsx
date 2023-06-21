import { useState } from "react";
import tw from "tailwind-styled-components";

const Pagenation = () => {
  const [page, setPage] = useState(1);
  return (
    <Nav>
      <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &lt;
      </Button>
      {Array(10)
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
      <Button onClick={() => setPage(page + 1)} disabled={page === 10}>
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
