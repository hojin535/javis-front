import {AutoResizeInput} from "./AutoResizeInput.tsx";

export const UrlTooltipItem = ({value, urlRef, onChange, updateUrl}) => {
  return (
    <>
      <AutoResizeInput
        value={value}
        inputRef={urlRef}
        onChange={onChange}
        color={"white"}
        onBlur={(e) => updateUrl(e.target.value)}
      />
    </>
  );
};
