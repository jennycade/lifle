export const getResponse = async (route, method) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URI}/${route}`,
    {
      method: method,
    },
  );
  const json = await response.json();

  if (!response.ok) {
    return { errorMessage: json.error };
  } else {
    return json;
  }
}