import getCard from "./html.js";

test('Функция для создания карточки товара', () => {
    const html = '<article><h3>name</h3><p>letter</p><p>999</p></article>';
    const el = getCard({title: 'name', description: 'letter', price: '999'});
    expect(el.outerHTML).toBe(html); // проверяем, что это html
    expect(el).toBeInstanceOf(HTMLElement); // instance это HTML элем.
    expect(el.childNodes.length).toBe(3); // сколько дочерних элементов
});
