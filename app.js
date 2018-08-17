
const express = require('express');
const app = express();


var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));


app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api/timestamp/:date_string?",  (req, res) => {
  const dateString = req.params.date_string; 
  if (!dateString)
  {
   const date = new Date(); 
   res.status(200).json({
  "unix":date.getTime(),
   "utc":date.toUTCString()
  });
    return; 
  }
  const date = new Date(isNumeric(dateString) ? parseInt(dateString) : dateString); 

  if(isNaN(date))
     {
       res.status(403).json({"error" : "Invalid Date" }); 
       return; 
     }
  res.status(200).json({
  "unix":date.getTime(),
   "utc":date.toUTCString()
  });
});



const listener = app.listen(process.env.PORT, () => {
  console.log('listening on port ' + listener.address().port , "...");
});



//After learning REGEX will use it instead of this function 
function isNumeric (str)
{
  for(let i = 0 ; i <= str.length-1 ; i++)
  {
   let charCode = str.charCodeAt(i);
   if (charCode < 48 || charCode > 57)
   {
     return false;
   }}
  return true; 
}