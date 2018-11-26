export const renderScreen (template) => {
  const wrapper = document.querySelector(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

const mainElement = document.querySelector(`.app`);

export const changeScreen (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};


