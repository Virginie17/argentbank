export const fetchUser = async (token: string) => {
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    return data.body
  }