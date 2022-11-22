const input = document.querySelector('#input');
const priority = document.querySelector('#priority');
const form = document.querySelector('#form');
const container = document.querySelector('#container');
const sort = document.querySelector('#sort');

const taskList = [];

const createTodoHtml = ({description, priority}) => {
  return `
  <div class="shadow-sm bg-body rounded" style="display: flex; flex-direction: column; align-items: center; padding: 12px; border: 1px solid black">
    <p>${description}</p>
    <p>Priority: ${priority}</p>
  </div>
`;
};

const addTask = async (task) => {
  taskList.push(task);

  const response = await fetch('http://localhost:3000/todos', {
    method: 'POST',
    body: JSON.stringify({
      "description": task.description,
      "priority": task.priority,
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log(response);
}

sort.addEventListener('click', () => {
  console.log('click');
  const sortedList = taskList.sort((a,b) => Number(a.priority) - Number(b.priority));

  console.log(sortedList);
  
  let finishedHtml = '';

  for (let i = 0; i < taskList.length; i++) {
    finishedHtml = finishedHtml + createTodoHtml(sortedList[i]);
  }
  
  container.innerHTML = finishedHtml;
})

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if(input.value.length < 3) {
    alert('Please enter more than 3 characters');
    return;
  }

  const task = {
    description: input.value,
    priority: priority.value,
  };

  console.log(task);

  addTask(task);

  let finishedHtml = '';

  for (let i = 0; i < taskList.length; i++) {
    finishedHtml = finishedHtml + createTodoHtml(taskList[i]);
  }
  
  container.innerHTML = finishedHtml;
});
