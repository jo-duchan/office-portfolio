export async function createSession(token: string) {
  try {
    const result = fetch("/api/create-cookies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    return result;
  } catch (error) {
    console.error("Session creation failed", error);
  }
}

export async function removeSession() {
  try {
    const result = fetch("/api/remove-cookies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return result;
  } catch (error) {
    console.error("Session creation failed", error);
  }
}
