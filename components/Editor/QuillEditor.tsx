import dynamic from "next/dynamic";

export const QuillEditor = dynamic(
  async () => {
    const {default: RQ} = await import("react-quill");
    return ({forwardedRef, ...props}) => <RQ ref={forwardedRef} {...props} />;
  },
  {ssr: false}
);

