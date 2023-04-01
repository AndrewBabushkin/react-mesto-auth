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
        console.log(data.token);
        localStorage.getItem("jwt", data.token);

        return data.token;
      }
    });
};

const checkToken = (jwt) => {
  return fetch(`${baseUrL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
};

export { baseUrL, register, authorize, checkToken };
