import { useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../../hooks/useFetchData";
import Logo from "../../assets/LOGO.png";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navi = useNavigate();
  const { fetchData } = useFetchData();
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
        const res = await fetchData("/SignUp", "POST", signUpData);
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
        variant="outlined"
        sx={{
          position: "relative",
          right: 0,
          mt:2,ml:2,
          color: "white", // 텍스트 색상
          background: "black",
          "&:hover": {
            backgroundColor: "gray", // 호버 시 연한 회색 배경
          },
        }}
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
          <img
            src={Logo}
            width={50}
            height={50}
            style={{ borderRadius: 25 }}
            alt="로고"
          />
          <Typography component="h1" variant="h5">
            회원가입
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
              label="이름"
              name="이름"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="이메일"
              label="이메일"
              name="이메일"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="비밀번호"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                position: "relative",
                right: 0,
                mt:2,mb:3,
                color: "white", // 텍스트 색상
                background: "black",
                "&:hover": {
                  backgroundColor: "gray", // 호버 시 연한 회색 배경
                },
              }}
            >
              회원가입
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
