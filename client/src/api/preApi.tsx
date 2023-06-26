const API_BASE =
  "http://ec2-43-200-88-48.ap-northeast-2.compute.amazonaws.com:8080";

export default {
  // 유저 목록 가져오기
  async getUserList(page = 1, size = 10) {
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
  async getQuestion(id = "1") {
    const response = await fetch(`${API_BASE}/questions/${id}`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    return response;
  },
  async getAnswer() {
    const response = await fetch(`${API_BASE}/answers?page=1&size=100`, {
      method: "GET",
    });
    return response;
  },
};
