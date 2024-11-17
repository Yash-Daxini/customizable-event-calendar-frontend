const env = import.meta.env;

interface ApiResponse {
  statusCode: number,
  data: any
}

export const fetchApi = async (
  endPoint: string,
  token: string | null,
  method = "GET",
  body = null,
): Promise<ApiResponse> => {
  const options = getFetchOptions(method, body, token);

  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${env.VITE_Domain}${endPoint}`, options);

    let data;

    if (response.status === 500) throw new Error("Server Error");

    if (response.status === 400) return { statusCode: 400, data: null };

    if (response.status === 401) return { statusCode: 401, data: null };

    if (method !== "DELETE") data = await response.json();

    return {
      statusCode: response.status,
      data: data,
    };
  } catch (error) {
    throw error;
  }
};

const getFetchOptions = (method: string, body: any, token: string | null) => {
  let options: any;
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
