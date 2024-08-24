const env = import.meta.env;

export const fetchApi = async (
  endPoint,
  token,
  method = "GET",
  body = null,
) => {
  const options = getFetchOptions(method, body, token);

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${env.VITE_Domain}${endPoint}`, options);

    let data;

    if (response.status === 500) throw new Error("Server Error");

    if (response.status === 400) return { status: 400, data: null };

    if (method !== "DELETE") data = await response.json();

    return {
      status: response.status,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const getFetchOptions = (method, body, token) => {
  let options;
  if (token)
    options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  else
    options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

  if (body) options.body = JSON.stringify(body);

  return options;
};
