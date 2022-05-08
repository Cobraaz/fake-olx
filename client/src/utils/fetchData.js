export const getData = async (
  url,
  token = localStorage.getItem("OLX_TOKEN")
) => {
  const res = await fetch(`/api/${url}`, {
    method: "GET",
    headers: {
      "olx-token": token,
    },
  });

  const data = await res.json();
  return data;
};

export const postData = async (
  url,
  post,
  token = localStorage.getItem("OLX_TOKEN")
) => {
  const res = await fetch(`/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "olx-token": token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const putData = async (
  url,
  post,
  token = localStorage.getItem("OLX_TOKEN")
) => {
  const res = await fetch(`/api/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "olx-token": token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const patchData = async (
  url,
  post,
  token = localStorage.getItem("OLX_TOKEN")
) => {
  const res = await fetch(`/api/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "olx-token": token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const deleteData = async (
  url,
  token = localStorage.getItem("OLX_TOKEN")
) => {
  const res = await fetch(`/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "olx-token": token,
    },
  });

  const data = await res.json();
  return data;
};
