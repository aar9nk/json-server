const container = document.querySelector('#container');
const input = document.querySelector('#input');
const form = document.querySelector('#form');
const priority = document.querySelector('#priority');
const sort = document.querySelector('#sort');

function createHtml(description, priority) {
  return `
    <div>
      <p>${description}</p>
      <p>Priority: ${priority}</p>
    </div>
  `;
}

async function addTask(task) {
  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    body: JSON.stringify({
      description: task.description,
      priority: task.priority
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const data = await response.json();
}

async function render() {
  const response = await fetch('http://localhost:3000/todos');
  const array = await response.json();
  
  let finishedHtml = '';

  for(let i = 0; i < array.length; i++) {
    finishedHtml = finishedHtml + createHtml(array[i].description, array[i].priority);
  }

  container.innerHTML = finishedHtml;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if(input.value.length < 1) {
    alert('Todo description must be at least 1 character long');
    return;
  };
  
  if(priority.value < 1) {
    alert('Priority must be a number greater than 0');
    return;
  }

  const task = {
    description: input.value,
    priority: priority.value,
  };
  
  await addTask(task);

  await render();
});

sort.addEventListener('click', async () => {
  taskList.sort((a, b) => (a.priority - b.priority));

  await render();
});


document.addEventListener('DOMContentLoaded', async () => {
  await render();
})