const mainElement = document.querySelector(`section.main`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export const convertSeconds = (time) => {
  const seconds = `${time % 60}`;
  return (seconds.length > 1) ? `${seconds}` : `0${seconds}`;
};

export const convertMinutes = (time) => {
  const minutes = `${Math.floor(time / 60)}`;
  return (minutes.length > 1) ? `${minutes}` : `0${minutes}`;
};
