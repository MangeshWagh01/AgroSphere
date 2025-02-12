// src/services/AuthService.js

const API_BASE_URL = 'https://localhost:8989';

async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export default { loginUser };
