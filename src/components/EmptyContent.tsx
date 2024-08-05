// @mui
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(8, 2),
}));

export default function EmptyContent({
  title,
  description,
  img,
  ...other
}: any) {
  return (
    <RootStyle {...other}>
      <img
        src={img || "/images/comingsoon.png"}
        alt="empty content"
        style={{ height: 240, marginBottom: 3 }}
      />

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      )}
    </RootStyle>
  );
}
