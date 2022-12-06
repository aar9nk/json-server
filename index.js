const container = document.querySelector('#container');
const button = document.querySelector('#button');
// https://meowfacts.herokuapp.com/

const getData = async () => {
  const serverData = fetch('https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=1d746361df4112d4a44339cc2fabd41b&units=metric')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    return data
  });

  return serverData;
}

const createHtml = (temperature, visibility) => {
  return `
    <p>The temp in sydney is ${temperature} and the visibility is ${visibility}</p>
  `;
}

button.addEventListener('click', async () => {
  const serverResponse = await getData();

  const temp = serverResponse.main.temp;
  const visibility = serverResponse.visibility;
  
  container.innerHTML = createHtml(temp, visibility);
});