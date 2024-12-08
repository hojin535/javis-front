import { Chip } from "@mui/material";

/**
 * 태그 디자인
 * @param label (표시이름)
 * @param item item.type(역량 or 인성) 색상 구별이 필요할때
 * @returns {JSX.Element}
 * @constructor
 */
export const CustomTag = ({ label, item }) => {
  return (
    <Chip
      label={label}
      sx={{
        marginRight: "5px",
        marginTop: "5px",
        backgroundColor: item.type === "competency" ? "#e3f2ff" : "#f6e2ff", //역량태그
        color: item.type === "competency" ? "#57788c" : "#b659b9", //인성태그 Personality
      }}
    />
  );
};
