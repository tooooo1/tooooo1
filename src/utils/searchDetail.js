export const searchDetail = async (id) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_KEY}&i=${id}&plot=full`
    );

    if (!res.ok) {
      throw new Error();
    }
    return await res.json();
  } catch (e) {
    throw new Error(`${e.message}`);
  }
};
