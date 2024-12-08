import { Button, styled } from "@mui/material";

export const CustomButton = styled(Button)`
  color: ${(props) => (props.isSelected ? "black" : "white")};
  background: black;
  &:hover {
    background: gray;
  }
`;
