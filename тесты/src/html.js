const getCard = ({ title, description, price }) => {
    const articleEl = document.createElement('article');

    const titleEl = document.createElement('h3');
    titleEl.textContent = title;

    const descriptionEl = document.createElement('p');
    descriptionEl.textContent = description;

    const priceEl = document.createElement('p');
    priceEl.textContent = price;

    articleEl.append(titleEl, descriptionEl, priceEl);
    
    return articleEl;
};

export default getCard;