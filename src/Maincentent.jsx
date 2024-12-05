'use client';
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Plyer from './app/Plyer';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import moment from "moment";
import"moment/dist/locale/ar-dz"
moment.locale("ar-dz")


export default  function Maincentent() {  
  let nextPelyer=null;
  const[plyerindex,setplyerindex]=useState(0);
  const [rim,setrim]=useState("");
const  nextPelyerindex=[
{key:"Fajr",name:"الفجر"},
{key:"Dhuhr",name:"الظهر"},
{key:"Asr",name:"العصر"},
{key:"Maghrib",name:"المغرب"},
{key:"Isha",name:"العشاء"},

]

  let[timer,settimer]=useState(10);
  let[scity,setcity]=useState({
    displyename:"الاسكندريه",
    apiname:"Alexandria"
  })
  const [timee,settimee]=useState("")
    const handleChange=(event)=>{
        setcity(event.target.value)
    };
    // const data= await axios.get("https://api.aladhan.com/timingsByAddress?address=Alexandria,EGY")
    let gettime= async()=>{
      console.log("colling")
      const rsponss=await axios.get(`https://api.aladhan.com/v1/timingsByAddress/18-11-2024?address=${scity.apiname}`);
      settimings(rsponss.data.data.timings)
      
    };
    let [timings,settimings] = useState ({
      "Fajr": "04:56",
      "Sunrise": "06:27",
      "Dhuhr": "11:45",
      "Asr": "14:42",
      "Sunset": "17:02",
      "Maghrib": "17:02",
      "Isha": "18:24",
    })
    useEffect(()=>{
      gettime();
      
      
   
    },[scity]);
    useEffect(()=>{
      let tm=setInterval(()=>{
        setupCountdownTimer()
    
      },1000)
      const t=moment();
      settimee(t.format("MMM Do YYYY | h:mm"));

      return()=>{
        clearInterval(tm)
      }


    },[timings])
    
    const setupCountdownTimer=()=>{
      const nowTime=moment();
      
     if(nowTime.isAfter(moment(timings["Fajr"],"hh:mm"))&&nowTime.isBefore(moment(timings["Dhuhr"],"hh:mm"))){
        nextPelyer=1;
      } 
      else if(nowTime.isAfter(moment(timings["Dhuhr"],"hh:mm"))&&nowTime.isBefore(moment(timings["Asr"],"hh:mm"))){
        nextPelyer=2;
      }
      else if(nowTime.isAfter(moment(timings["Asr"],"hh:mm"))&&nowTime.isBefore(moment(timings["Maghrib"],"hh:mm"))){
        nextPelyer=3;
      }
      else if(nowTime.isAfter(moment(timings["Maghrib"],"hh:mm"))&&nowTime.isBefore(moment(timings["Isha"],"hh:mm"))){
        nextPelyer=4;
      }
      else{
        nextPelyer=0;
      }
      setplyerindex(nextPelyer);
      const nextPelyerobject=nextPelyerindex[nextPelyer];
      const nextPelyertime=timings[nextPelyerobject.key];
      let reminingtime=moment(nextPelyertime,"hh:mm").diff(nowTime);
      const durtionReminingtime=moment.duration(reminingtime);
      const mednghtfajer=moment(nextPelyertime,"hh:mm");
      console.log(mednghtfajer);
      if(reminingtime<0){
        const mednighttime=moment("23:59:59","hh:mm:ss").diff(nowTime);
        const fajertime=mednghtfajer.diff(moment("00:00:00","hh:mm:ss"));
        const toteldff=mednghtfajer+fajertime;
        reminingtime=toteldff;
        
        console.log("mednght",mednighttime.format("hh:mm"));
      }
      setrim(`${durtionReminingtime.hours()}:${durtionReminingtime.minutes()}:${durtionReminingtime.seconds()}`)
      console.log("next plyer is",durtionReminingtime.hours(),durtionReminingtime.minutes(),durtionReminingtime.seconds());

    }
  
  return (
    <>
    <div>
        <Grid  container>
            <Grid size={6}>
                <div>
                    <h2>{timee}</h2>
                    <h1>{scity.displyename}</h1>
                   
                </div>
            </Grid>
            <Grid size={6}>
                <div>
                  <h2>{}</h2>
                    <h2>متبفي حتي صلاة {nextPelyerindex[plyerindex].name}  </h2>
                    <h1>{rim}</h1>
                </div>
            </Grid>

        </Grid>
        <Divider className='divider'/>
        <Stack direction={'row'} justifyContent={'space-around'} >
            
        <Plyer name="الفجر" time={timings.Fajr} imge="https://cdn.elwatannews.com/watan/610x300/2853262731559358207.jpg"/>
        <Plyer name="الظهر" time={timings.Dhuhr} imge="https://cdn.arabsstock.com/uploads/images/265785/image-265785-increasing-acts-obedience-remembrance-god-almighty-elderl-thumbnail.webp"/>
        <Plyer name="العصر" time={timings.Asr} imge="https://boldnews.net/wp-content/uploads/2021/01/15-5.jpg"/>
        <Plyer name="المغرب" time={timings.Maghrib} imge="https://marsalqatar.qa/uploads/images/2024/03/ZAbub.jpg"/>
        <Plyer name="العشاء" time={timings.Isha} imge="https://hiragate.com/wp-content/uploads/2023/03/5f23169b421aa92a6e1ec4b2.webp"/>

        </Stack>


        <Stack direction="row" style={{marginTop:"20px"}} justifyContent="center">
        <FormControl style={{width:"20%"}}>
        <InputLabel id="demo-simple-select-label">المدينه</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   value="المدينه"
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={{
            displyename:"الاسكندريه",
            apiname:"Alexandria"
          }}>الاسكندرية</MenuItem>
          <MenuItem value={{
            displyename:"القاهرة",
            apiname:"Cairo"
          }}>القاهرة</MenuItem>
          <MenuItem value={{
            displyename:"سوهاج",
            apiname:"Sohag"
          }}>سوهاج</MenuItem>
        </Select>
      </FormControl>
        </Stack>
        
    </div>
    </>
  )
}
