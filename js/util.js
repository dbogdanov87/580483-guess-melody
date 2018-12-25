const secondsInMinute = 60;
const mainElement = document.querySelector(`section.main`);

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export const convertSeconds = (time) => {
  const seconds = `${time % secondsInMinute}`;
  return (seconds.length > 1) ? `${seconds}` : `0${seconds}`;
};

export const convertMinutes = (time) => {
  const minutes = `${Math.floor(time / secondsInMinute)}`;
  return (minutes.length > 1) ? `${minutes}` : `0${minutes}`;
};
