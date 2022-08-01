let  LocBtn=document.querySelector(".but");
        
        let des= document.querySelector(".des");
        let icon= document.querySelector(".img");
        let temp=document.querySelector(".temp");
        let humid=document.querySelector(".humid");
        let wind=document.querySelector(".wind");
        let feels=document.querySelector(".feels");
        let pressure=document.querySelector(".pressure");
        let Key="2f6acd6f5c0582efc69641c4e557e32e";
        let lat,lon,vall,res;
        let SearchBtn=document.querySelector(".button");
        
 var inputValue=document.getElementById("inputValue");
 
 
LocBtn.onclick=()=> {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
       /*fetch('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=2f6acd6f5c0582efc69641c4e557e32e')*/
       
 
  
  
  
    } else {
        alert( "Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
   lat= position.coords.latitude;
   
    lon= position.coords.longitude;
    alert( lat +" " + lon)
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+Key+"&units=metric")
  .then(response => response.json())
  .then((data)=>{
      data.name=="Takoradze"?data.name=" Takoradi":data.name;
      inputValue.value="City : "+data.name ;
      des.innerHTML=data.weather[0].description;
      icon.src=`http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      icon.style.filter="blur(6px)";
      temp.innerHTML=data.main.temp+"°C";
     humid.innerHTML=data.main.humidity+"%";
     wind.innerHTML=data.wind.speed+"m/s";
     feels.innerHTML=data.main.feels_like+"°C";
     pressure.innerHTML=data.main.pressure+"hPa";
  });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
         alert( "You have denied location access.\n Access needed for precise information.")
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Sorry , your location unavailable.")
            break;
        case error.TIMEOUT:
        alert("The request is timed out")
            break;
        case error.UNKNOWN_ERROR:
            alert( "Sorry An unknown error occurred.")
            break;
    }
}/*
 function Search(city){
      try{
 
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Key}&units=metric`)
  .then(response => response.json())
  .then((data)=>{
      
      res=data.message;
      if(data.cod!=200&&city!="")
      {
          alert("ERROR!"+"\n"+res.toUpperCase());
      }else if(data.cod!=200&&city!==""){
          alert("ERROR!"+"\n"+res.toUpperCase()+"\n"+"EMPTY FIELD");
      }else if(city==""){
          alert("EMPTY  FIELD")
      }
      
      else{
      des.innerHTML=data.weather[0].description;
      icon.src=`http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      
      temp.innerHTML=data.main.temp+"°";
     humid.innerHTML=data.main.humidity+"%";
     wind.innerHTML=data.wind.speed+"m/s";
     feels.innerHTML=data.main.feels_like+"°";
     pressure.innerHTML=data.main.pressure+"hPa";
      }
      icon.style.filter="blur(6px)";
})
}
catch(er){
    alert(er)
}
}
/*
SearchBtn.addEventListener("click",()=>{
Search(document.getElementById("inputValue").value);
});*/

let weather = {
  apiKey: "2f6acd6f5c0582efc69641c4e557e32e",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("Nothing found.");
         
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
      
    let { name } = data;
    name=="Takoradze" ?name="Takoradi" :name;
    const { icon, description } = data.weather[0];
    const { temp, humidity,feels_like,pressure } = data.main;
    const { speed } = data.wind;
    document.querySelector(".inputValue").innerText = "Weather in " + name;
    document.querySelector(".img").src =
      `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    document.querySelector(".des" ).innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humid").innerText =
      humidity + "%";
    document.querySelector(".wind").innerText =
     speed + " m/s";
      feels.innerHTML=data.main.feels_like+"°C";
     document.querySelector(".pressure").innerHTML=pressure+"hPa"
    document.querySelector(".inputValue").value=name;

    
  },
  search: function () {
    this.fetchWeather(document.querySelector(".inputValue").value);
  },
};

document.querySelector(".button").addEventListener("click", function () {
  weather.search();
  
});
document.querySelector(".inputValue").addEventListener("keyup", function (e) {
  console.log(e)
  if (e.key=="Enter") {
      weather.search();
      document.querySelector(".inputValue").blur();
  }
  
});
weather.fetchWeather("Accra");



