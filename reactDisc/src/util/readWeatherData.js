module.exports = (weatherData) => {
    let data = [];
    let dataToday = [];
    let dataTomorrow = [];
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    let tomorrow = new Date(date);
    tomorrow.setDate(new Date().getDate()+1);
    weatherData.forEach(el => {
        let section = {};
        section.tempInC = Math.round(el.main.temp - 273.15);
        section.hum = el.main.humidity;
        section.wind = Math.round(el.wind.speed);
        section.characteristics = el.weather[0].description;
        section.dateAndTime = el.dt_txt.split(' ');
        section.time = section.dateAndTime[1].slice(0, 5);
        section.date = new Date(section.dateAndTime[0]);
        section.formatedDate = section.dateAndTime[0].slice(8,10) + "/" + section.dateAndTime[0].slice(5,7);
        section.weekDay = weekDays[section.date.getDay()];
        if (date.getDate() === section.date.getDate()) {
            dataToday.push(section);
        } else if (tomorrow.getDate() === section.date.getDate()) {
            dataTomorrow.push(section);
        }
        
    });
    data.push(dataToday);
    data.push(dataTomorrow);
    return data;
}
