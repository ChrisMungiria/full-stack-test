export const logLogInTime = async (userID: string) => {
  await fetch("http://localhost:8001/api/logLogInTime", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID,
    }),
  });
};
