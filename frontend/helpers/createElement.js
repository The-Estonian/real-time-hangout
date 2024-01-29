export const NewElement = (tag, eleClassName, eleText) => {
  const newEle = document.createElement(tag);
  if (eleClassName != null) {
    newEle.classList = eleClassName;
  }
  if (eleText != null) {
    if (tag == 'button') {
      newEle.textContent = eleText;
    } else {
      newEle.innerHTML = eleText;
    }
  }
  return newEle;
};

export const LoadContainer = (node) => {
  const container = document.querySelector('.container');
  if (!container.contains(node)) {
    container.appendChild(node);
  }
};
