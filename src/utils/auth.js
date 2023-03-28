const baseUrL = "https://auth.nomoreparties.co";

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response.status}`);
};

const register = (email, password) => {
  return fetch(`${baseUrL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

const authorize = (email, password) => {
  return fetch(`${baseUrL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.getItem("jwt", data.token);
        console.log(data);
        return data.token;
      }
    });
};

const getContent = (token) => {
  return fetch(`${baseUrL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .then((data) => data);
};

export { baseUrL, register, authorize, getContent };
