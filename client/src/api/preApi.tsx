const API_BASE =
  "http://ec2-43-200-88-48.ap-northeast-2.compute.amazonaws.com:8080";

interface Join {
  name: string;
  phone: string;
  email: string;
  password: string;
  birthday: string;
}
interface Login {
  username: string;
  password: string;
}
interface UpdateQuestion {
  title: string;
  content: string;
}
interface UpdateAnswer {
  questionId: string;
  content: string;
}

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
  // 로그인
  async postLogin(data: Login) {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
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
  // 질문 수정
  async updateQuestion(
    id: string,
    data: UpdateQuestion,
    access: string,
    refresh: string
  ) {
    const response = await fetch(`${API_BASE}/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        Authorization: `${access}`,
        Refresh: `${refresh}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  },
  // 답변 수정
  async updateAnswer(
    id: string,
    data: UpdateAnswer,
    access: string,
    refresh: string
  ) {
    const response = await fetch(`${API_BASE}/answers/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${access}`,
        Refresh: `${refresh}`,
      },
      body: JSON.stringify(data),
    });
    return response;
  },
  // 개별 답변 가져오기
  async getAnswerModify(id: string) {
    const response = await fetch(`${API_BASE}/answers/${id}`, {
      method: "GET",
    });
    return response;
  },
};
