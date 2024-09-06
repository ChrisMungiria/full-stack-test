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

export const updateUserLocation = async (
  userID: string,
  latitude: number,
  longitude: number
) => {
  await fetch("http://localhost:8001/api/updateLocation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID,
      latitude,
      longitude,
    }),
  });
};
