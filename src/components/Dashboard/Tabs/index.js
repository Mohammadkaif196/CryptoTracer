import React,{useState} from 'react';
import "./style.css"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme,ThemeProvider } from '@mui/material';
import Grid from '../Grid';
import List from "../List"
export default function TabComponent({coins}) {
  const [value, setValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style={
    color:"var(--white)",
    width:"50vw",
    fontSize:"1.2rem",
    fontWeight:600,
    fontFamily:"Inter",
    textTransform:"capitalize"

  }

const theme=createTheme({
    palette:{
        primary:{
           main:"#7028ad",
        }
    }
}
)
  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
          <TabList onChange={handleChange} variant="fullWidth" indicatorColor="primary"
  textColor="primary">
            <Tab label="Grid" value="grid"  sx={style}/>
            <Tab label="List" value="list" sx={style}/>
          </TabList>
    
        <TabPanel value="grid">
        <div className='grid-data'>
                {coins.map((coin,i)=>{
                    return (
                        <Grid coin={coin} key={i}/>
                  
                )
                })}
                  </div>
        </TabPanel>
        <TabPanel value="list">
               <table className='table-list'>
                {coins.map((coin,i)=>{
                    return (
                      <List coin={coin} key={i}/>
                    )
                })}
            </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
