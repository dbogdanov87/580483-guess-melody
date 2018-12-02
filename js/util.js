const mainElement = document.querySelector(`section.main`);

export const getRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const changeScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export const renderScreen = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

