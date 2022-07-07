const express=require('express');
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const https=require('https');
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/index.html");
})
  app.post("/",function(req,res)
{
  const  query=req.body.cityname;
  const  appkey="e27ebb506ad99a8308ddcf789f292ac9";
  const  unit="metric";
  const  url="https://api.openweathermap.org/data/2.5/weather?appid=" + appkey + "&q=" + query + "&units=" + unit +""
  https.get(url,function(response)
  {
  console.log(response.statusCode);
  response.on("data",function(data)
  {
  const weatherData=JSON.parse(data);
  const temp=weatherData.main.temp;
  const des=weatherData.weather[0].description;
  const icon=weatherData.weather[0].icon;
  const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
  res.write("<p>The weather is currently "+des+"</p>");
  res.write("<h1>the temperature in " + query +" is "+temp+" degree celcius</h1>");
  res.write("<img src="+imageUrl+">");
  res.send();
  })
  })
})





app.listen(3000,function()
{
  console.log("i am listening");
});
