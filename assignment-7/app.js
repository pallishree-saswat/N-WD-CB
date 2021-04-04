const container = document.querySelector('.details')
const form = document.querySelector('form');
const name1 = document.getElementById('name')
const temp = document.getElementById('temp')
const cloud = document.getElementById('cloud')
const min = document.getElementById('min')
const max = document.getElementById('max')
const date = document.getElementById('date')




//make request
const getWeatherData = async(searchText) => {


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=477213f04edc6d08f67b61b35e24d6a2&units=metric`)
    .then(response => response.json())
    .then(data => {
      console.log(data)


      const tempData = data['main']['temp']

      const nameData = data['name']
      const country = data['sys']['country']
      const description = data['weather'][0]['description']

      const temp_max = data['main']['temp_max']
      const temp_min = data['main']['temp_min']

       const dateTime = new Date().toLocaleDateString();

    /*   console.log(tempData, nameData) */

    name1.innerHTML = `${nameData}, ${country} `;
    cloud.innerHTML = description;
    temp.innerHTML = tempData + `<sup>o</sup>C`;
     max.innerHTML = `${temp_max}<sup>o</sup>C / ${temp_min}<sup>o</sup>C`;
    date.innerHTML =  dateTime;

  

    })
    .catch(err => {
      console.log(err)
    })


}



form.addEventListener('submit', (e) => {
e.preventDefault()
console.dir(form.elements[0].value)

getWeatherData(form.elements[0].value)


})

