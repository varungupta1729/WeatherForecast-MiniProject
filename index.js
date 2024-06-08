const http = require("http");
const fs = require("fs");
const requests = require("requests");
const homeFile = fs.readFileSync("home.html");

const replaceVal =(tempVal , orgVal) =>{

    let temperature = temperature.replace("{%tempval%}" , orgVal.main.temp);
     temperature = temperature.replace("{%tempmin%}" , orgVal.main.temp_min);
     temperature = temperature.replace("{%tempmax%}" , orgVal.main.temp_max);
     temperature = temperature.replace("{%loaction%}" , orgVal.main.name);
     temperature = temperature.replace("{%country%}" , orgVal.sys.country);
     temperature = temperature.replace("{%tempstatus%}" , orgVal.weather[0].main);
    return temperature;
}
const server = http.createServer((req , res) =>{
 if(req.url = '/'){
    requests("https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=4a058be5b7a45fe236b653a7655e5330" )
    .on("data" , function (chunk){
        const objData = JSON.parse(chunk)
        const arrData = [objData];
        // weather = arrData[0].main.temp;

        const realTimeData = arrData.map((val)=>
            replaceVal(homeFile,val)).join("")
        res.write(realTimeData);
        console.log(realTimeData);
    })
    .on("end" , function(err){
        if(err) return console.log("connection closed due to error" , err);
   res.end();
        // console.log(error);
    }); 
 }
  

});


server.listen(8000 , "127.0.0.1" , ()=>{
    console.log("Server is running at 8000")
});