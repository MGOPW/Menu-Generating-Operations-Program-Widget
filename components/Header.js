import styled from "styled-components";

export default function Header() {
  return (
    <Wrapper>
      <nav className="nav">
        <h1>Welcome to my app!</h1>
      </nav>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  color: red;
`;
