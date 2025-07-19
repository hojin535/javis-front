"use client";

import {Box, Button, Container, TextField, Typography,} from "@mui/material";
import Logo from "@/public/assets/LOGO.png";
import Image from "next/image";
import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useAtom} from "jotai";
import {loginAtom} from "../../app/Jotai";
import {useLogin} from "@/hooks/useLogin";

export default function LoginPage() {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const {login, loading} = useLogin();

  const [, setIsLogin] = useAtom(loginAtom);

  const handleSubmit = async () => {
    try {
      await login(Email, password);
      setIsLogin(true);
      router.push("/info");
    } catch (error) {
      console.log(error);
      alert("로그인에 실패하였습니다.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (Email && password) {
        handleSubmit();
      } else {
        alert("이메일과 비밀번호를 입력해주세요.");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src={Logo}
          width={50}
          height={50}
          style={{borderRadius: 25}}
          alt="로고"
        />
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Box noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            fullWidth
            id="Email"
            label="이메일"
            name="이메일"
            autoComplete="Email"
            autoFocus
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <TextField
            margin="normal"
            fullWidth
            name="비밀번호"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{
              position: "relative",
              right: 0,
              mt: 2,
              mb: 3,
              color: "white", // 텍스트 색상
              background: "black",
              "&:hover": {
                backgroundColor: "gray", // 호버 시 연한 회색 배경
              },
            }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </Button>

          <Link
            href="/signup"
            style={{display: "flex", justifyContent: "center"}}
          >
            회원가입
          </Link>
        </Box>
      </Box>
    </Container>
  );
}