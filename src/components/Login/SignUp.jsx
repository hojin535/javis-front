import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navi = useNavigate();
  const {fetchData} = useFetchData();
  const handleSubmit = (event) => {
    event.preventDefault();
    // 회원가입 처리 로직을 여기에 추가합니다.

    const signUpData = {
      id: email,
      password: password,
      name: name,
    };
    const handleSignUp = async () => {
      try {
        const res = await fetchData("/SignUp","POST", signUpData);
        console.log(res.data);
        alert("회원가입 성공");
        navi("/");
      } catch (error) {
        console.error(error);
        alert("회원가입에 실패했습니다.");
      }
    };
    handleSignUp();
    console.log({ name, email, password });
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ marginTop: "10px", marginLeft: "10px" }}
        onClick={() => navi(-1)}
      >
        뒤로가기
      </Button>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
