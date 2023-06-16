const API_BASE = "";

export default {
  async getSomething() {
    const popular = await fetch(`${API_BASE}/`);
    return popular;
  },
};
