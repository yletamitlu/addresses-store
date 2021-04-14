import React, {useState} from 'react';
import {observer} from 'mobx-react-lite'
import {Box, Button} from '@material-ui/core';
import useStore from '../hooks/useStore'
import AddrTable from "../components/Table";
import AddrForm from "../components/Form";
import AddrMap from "../components/Map";

function MainPage() {
    const {addresses} = useStore();

    const [stateCreating, setStateCreating] = useState(true);

    function getPageStyles() {
        return {
            display: 'flex',
            alignContent: 'space-between',
        }
    }

    function getBoxStyles() {
        return {
            display: 'flex',
            flexDirection: 'column'
        }
    }

    function getBtnStyles() {
        return {
            alignSelf: 'start',
            backgroundColor: '#6eb9e7',
            marginBottom: 20
        }
    }

    function setWidth() {
        return {
            width: "30%",
            borderRadius: 5
        }
    }

    return (
        <Box m={5} p={5} style={getBoxStyles()}>
            <Button variant="contained" style={getBtnStyles()} onClick={() => {
                setStateCreating(true);
            }}>Добавить адрес</Button>
            <Box style={getPageStyles()}>
                <div style={setWidth()} onClick={(event) => {
                    if (event.target.localName === 'td') {
                        setStateCreating(false);
                    }
                }}>
                    <AddrTable addresses={addresses}/></div>
                {addresses.active && !stateCreating ?
                    <AddrForm active={addresses.active} addresses={addresses}/>
                    :
                    <AddrForm active={addresses.getExample()} addresses={addresses}/>}
                <AddrMap style={setWidth()}/>
            </Box>
        </Box>
    );
}

export default observer(MainPage);
