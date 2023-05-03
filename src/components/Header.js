import { AppBar, Container, MenuItem, Select, Toolbar, Typography, FormControl, createTheme, ThemeProvider } from '@mui/material'
import { makeStyles } from 'tss-react/mui';
import { useHistory } from 'react-router-use-history'
import React, { useEffect, useState } from 'react';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles()(() =>({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    }
}))

const Header = () => {
const [showLogoutButton, setShowLogoutButton] = useState(false)
    const { classes } = useStyles()

    const history = useHistory();

    const { currency, setCurrency } = CryptoState();

    console.log(currency)
useEffect(() => {
const token = localStorage.getItem("token")
if(token) setShowLogoutButton(true)
},[])
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        }
    })
    const logout = () => {
    console.log("LOgout....")
    localStorage.removeItem("token");
    history.push("/");
    }
return (
 <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar>
                <Typography 
                  onClick={() => history.push('/')} 
                  className={classes.title}
                  variant='h6'
                >
                    Crypto Tracker
                </Typography>
                {/* Code For Logout Button */}
                <div>
                {
                    showLogoutButton && <button style={{background: "gold",margin: "10px",padding: "10px", borderRadius:"#fff"}} onClick={() => logout()}>
                    Logout
                    </button>
                    
                }
    
                </div>

            <FormControl>
            <Select
                  variant='outlined'
                  style={{
                    width: 100,
                    height: 40,
                    marginRight: 15,
                  }}
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <MenuItem value={"USD"}>USD</MenuItem>
                  <MenuItem value={"INR"}>INR</MenuItem>
   
                </Select>
            </FormControl>
            </Toolbar>
        </Container>
    </AppBar>
 </ThemeProvider>
  )
}

export default Header
