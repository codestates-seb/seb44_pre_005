const API_BASE = "https://8eef-221-148-162-66.ngrok-free.app";

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
};
