export const search = async (searchName) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_KEY}&s=${searchName}&page=3`
    );

    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  } catch (e) {
    throw new Error(`${e.message}`);
  }
};
