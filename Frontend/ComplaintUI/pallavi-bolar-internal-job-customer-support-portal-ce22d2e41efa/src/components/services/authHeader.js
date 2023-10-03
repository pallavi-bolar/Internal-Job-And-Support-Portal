export default function authHeader() {
  const jwtToken = localStorage.getItem("jwtToken");

  if (jwtToken) {
    return { Authorization: "Bearer " + jwtToken };
  } else {
    return {};
  }
}
