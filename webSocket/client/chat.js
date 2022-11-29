const chat = document.createElement("div");
document.body.append(chat);

const ul = document.createElement("ul");
ul.style.cssText = `
  border: 1px solid black;
  min-height: 300px
`;

const form = document.createElement("form");
form.style.cssText = `
  display: flex;
  gap: 15px;
`;

chat.append(ul, form);

const login = document.createElement("input");
login.name = "login";
login.placeholder = "login";
login.style.cssText = `
  border: 1px solid black;
  width: 150px
`;

const message = document.createElement("input");
message.name = "message";
message.placeholder = "message";
message.style.cssText = `
  border: 1px solid black;
  width: 250px
`;

const button = document.createElement("button");
button.type = "submit";
button.textContent = "Отправить";

form.append(login, message, button);


const addMessage = (data) => {
  const li = document.createElement("li");
  ul.append(li);

  const p = document.createElement("p");
  p.textContent = `${data.login}: ${data.message}`;
  li.append(p);
};

const ws = new WebSocket('ws://localhost:3024');

ws.addEventListener('open', ()=> {
  console.log('connect');
});


ws.addEventListener('close', ()=> {
  console.log('disconnect');
});

ws.addEventListener('message', message => {  //или можно деструктурировать message({data})
  addMessage(JSON.parse(message.data));  // addMessage(JSON.parse(data)); 
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = JSON.stringify({   // собираем данные из формы
    login: form.login.value,
    message: form.message.value
  });
// отправляем их насервер
  ws.send(data);
  form.message.value = '';
})