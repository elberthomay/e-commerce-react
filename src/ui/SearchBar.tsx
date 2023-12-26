import { InputHTMLAttributes } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import styled from "styled-components";

const StyledSearchBar = styled.div`
  border-color: grey;
  border-radius: 3px;
`;

const StyledInput = styled.input``;

function SearchBar(inputProp: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <StyledSearchBar>
      <span>
        <HiMagnifyingGlass />
      </span>
      <StyledInput {...inputProp} />
    </StyledSearchBar>
  );
}

export default SearchBar;
