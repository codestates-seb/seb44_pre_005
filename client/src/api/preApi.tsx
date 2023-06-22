const API_BASE = "https://32c6-221-148-162-66.ngrok-free.app";

interface Join {
  name: string;
  phone: string;
  email: string;
  password: string;
  birthday: string;
}

export default {
  // 유저 목록 가져오기
  async getUserList(page = 1, size = 5) {
    const response = await fetch(
      `${API_BASE}/members?page=${page}&size=${size}`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    return response;
  },
  // 회원가입
  async postMember(data: Join) {
    const response = await fetch(`${API_BASE}/members`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(data),
    });
    return response;
  },
};
