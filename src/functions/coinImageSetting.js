export const coinImageData = (data, setCoin) => {
  const formattedData = data.map(coin => ({
      id: coin.id,
      name: coin.name,
      image: coin.image,
  }));
  setCoin(formattedData);
};
