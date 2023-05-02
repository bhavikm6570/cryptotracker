import axios from 'axios';
import { Container, LinearProgress, TableCell, Table, TableContainer, TableHead, TableRow, TextField, Typography, createTheme, TableBody, Pagination } from "@mui/material"
import React, { useEffect } from 'react';
import { makeStyles } from 'tss-react/mui';
import { CoinList } from '../config/api';
import { useState } from "react";
import { CryptoState } from '../CryptoContext';
import { ThemeProvider } from '@emotion/react';
import { useHistory } from 'react-router-use-history'
import { numberWithCommas } from './Banner/Carousel';

const CoinsTable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const history = useHistory();

    const { currency, symbol } = CryptoState();

    const useStyles = makeStyles()(() =>({
      row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
      },
      pagination: {
        "& .MuiPaginationItem-root": {
          Color: "gold",
        },
      },
    }))
   
    const { classes } = useStyles()

    const fetchCoins = async() => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary:{
                main: "#fff",
            },
            type: "dark",
        },
    })

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        ))
    }

  return <ThemeProvider theme={darkTheme}>
    <Container style={{ textAlign: "center"}}>
        <Typography
          variant='h4'
          style={{ margin: 18, fontFamily: "Montserrat"}}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField label="Search For a Crypto Currency.." 
          variant='outlined'
          style={{ marginBottom: 20, width: "100%"}}
          onChange={(e) => setSearch(e.target.value)}
        />
            <TableContainer>
                {
                    loading ? (
                      <LinearProgress style={{ backgroundColor: "gold" }}/>
                    ) : (
                      <Table>
                        <TableHead style={{ backgroundColor: "#EEBC1D"}}>
                           <TableRow>
                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                <TableCell
                                  style={{
                                    color: "gold",
                                    fontWeight: "700",
                                    fontFamily: "Montserrat",
                                  }}
                                  key={head}
                                  align={head === "Coin" ? "" : "right"}
                                >
                                   {head}
                                </TableCell>
                            ))}
                           </TableRow>
                        </TableHead>
                          <TableBody>

                            {handleSearch()
                            .slice((page - 1) * 10,(page - 1)* 10 + 10)
                            .map((row) => {
                            const profit = row.price_change_percentage_24h > 0;

                            return(
                                <TableRow
                                    onClick={() => history.push(`/coins/${row.id}`)}
                                    className={classes.row}
                                    key={row.name}
                                >
                                    <TableCell
                                      component="th"
                                      scope='row'
                                      style={{
                                        display: "flex",
                                        gap: 15,
                                      }}
                                    >
                                       <img
                                         src={row?.image}
                                         alt={row.name}
                                         height="50"
                                         style={{ marginBottom: 10 }}
                                       />
                                       <div
                                         style={{ display: "flex", flexDirection: "column"}}
                                       >
                                        <span
                                          style={{
                                            textTransform: "uppercase",
                                            fontSize: 22,
                                            color: "darkgrey"
                                          }}
                                        >{row.symbol}

                                        </span>
                                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                                       </div>
                                    </TableCell>

                                     <TableCell
                                       align="right"
                                       style={{ color: "darkgrey" }}
                                     >
                                        {symbol}{""}
                                        {numberWithCommas(row.current_price.toFixed(2))}
                                     </TableCell>

                                     <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{ color: "darkgrey" }}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                                </TableRow>
                            )
                          })}</TableBody>
                      </Table>
                    )
                }
            </TableContainer>

            <Pagination
              style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              classes={{ ul: classes.Pagination}}
              count={(handleSearch()?.length / 10).toFixed(0)}
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
              }} 
            />
    </Container>
  </ThemeProvider>
}

export default CoinsTable
