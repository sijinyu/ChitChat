import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// 랜덤 매칭을 위한 사용자 목록
const users: string[] = [];

// 랜덤 매칭 API 엔드포인트
app.get("/api/match", (req: Request, res: Response) => {
  // 사용자 목록에서 랜덤한 두 사용자를 선택하여 매칭
  const [user1, user2] = getRandomUsers(users);
  res.json({ user1, user2 });
});

// 사용자 등록 API 엔드포인트
app.post("/api/users", (req: Request, res: Response) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: "사용자명이 제공되지 않았습니다." });
  }
  users.push(username);
  res.status(201).json({ message: "사용자 등록이 성공적으로 완료되었습니다." });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

// 랜덤한 두 사용자 선택하는 함수
function getRandomUsers(users: string[]): [string, string] {
  const randomIndex1 = Math.floor(Math.random() * users.length);
  let randomIndex2 = Math.floor(Math.random() * users.length);
  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * users.length);
  }
  return [users[randomIndex1], users[randomIndex2]];
}
