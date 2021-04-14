import {observer} from "mobx-react-lite";
import {Table, TextField} from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import React, {useState} from "react";
import {
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    InputAdornment,
    IconButton
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function AddrTable({addresses}) {
    function getTableStyles() {
        return {
            padding: 0,
            marginBottom: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'space-between'
        }
    }

    function getSearchInputStyles() {
        return {
            height: 90,
            marginBottom: 30,
            padding: 20
        }
    }

    function getTableRowStyles() {
        return {
            cursor: 'pointer',
        }
    }

    function getHeaderStyles() {
        return {
            backgroundColor: '#7A9CC6'
        }
    }

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: '#e3f0fd',
            },
        },
    }))(TableRow);

    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });

    const classes = useStyles();
    const [param, setParam] = useState('');

    return (
        <>
            <TableContainer component={Paper} style={getTableStyles()}>
                <InputAdornment
                    fullWidth
                    onChange={(event) => {
                        setParam(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                            setParam(event.target.value);
                        }
                    }}
                    component={TextField}
                    type="search"
                    placeholder={"Поиск"}
                    style={getSearchInputStyles()}>
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                </InputAdornment>
                <Table size="medium" aria-label="a dense table">
                    <TableHead style={getHeaderStyles()}>
                        <TableRow>
                            <TableCell align="center">Адрес</TableCell>
                            <TableCell align="center">Статус</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {addresses?.findAddrByDest(param).map((addr) => (
                            <StyledTableRow key={addr.id} style={getTableRowStyles()} hover onClick={() => {
                                addresses.selectAddress(addr.id)
                            }}>
                                <StyledTableCell align="center">{addr.dest}</StyledTableCell>
                                <StyledTableCell align="center">{addr.status}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default observer(AddrTable);
