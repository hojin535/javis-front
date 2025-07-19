import { Typography } from "@mui/material";

export const PageTitle = ({ title, variant = "h5" }) => {
  return (
    <Typography variant={variant} sx={{ fontWeight: "600" }}>
      {title}
    </Typography>
  );
};
