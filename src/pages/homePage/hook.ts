export const useHook = () => {
  const fetchQuery = async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos');
    return await data.json();
  };

  return { fetchQuery };
};