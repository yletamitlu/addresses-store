import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import Button from '@material-ui/core/Button';
import {Form, Field} from 'react-final-form';
import {
    Select,
    TextField,
    Paper, FormLabel,
} from '@material-ui/core';
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

function AddrForm({active, addresses}) {
    let creating;

    function getFormStyles() {
        return {
            padding: 0,
            marginBottom: 0,
            width: '40%',
            margin: '0 40px'
        }
    }

    function getBtnStyles() {
        return {
            margin: '10px 0',
            backgroundColor: '#6eb9e7',
        }
    }

    function getFieldStyles() {
        return {
            margin: '8px 0 20px 0',
            color: '#0B1D51',
            padding: 5,
            border: '1px solid #7A9CC6',
            borderRadius: 3
        }
    }

    function getDataStyles() {
        return {
            margin: '20px 0 20px 0'
        }
    }

    function getLabelStyles() {
        return {
            marginTop: '30px'
        }
    }

    let addr;
    if (active?.dest === undefined) {
        addr = {
            dest: "Введите адрес",
            price: "Укажите цену",
            date: "2020-01-01",
            creator: "Укажите создателя",
            status: "Новый"
        };
        creating = true;
    } else {
        addr = {
            id: active.id,
            dest: active.dest,
            price: active.price,
            date: active.date,
            creator: active.creator,
            status: active.status
        };
    }

    const [status, setStatus] = useState(addr.status);
    const [date, setDate] = useState(addr.date);
    const [dest, setDest] = useState(addr.dest);
    const [price, setPrice] = useState(addr.price);
    const [creator, setCreator] = useState(addr.price);

    const onSubmit = () => {
        addr.dest = dest;
        addr.price = price;
        addr.date = date;
        addr.status =  status;
        addr.creator = creator;
        creating ?
            addresses.addAddress(addr)
            :
            addresses.changeAddress(addr);
    }

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={{
                dest: addr.dest,
                price: addr.price,
                date: addr.date,
                creator: addr.creator,
                status: addr.status
            }}
            render={({handleSubmit, form, submitting, pristine, values}) => (
                <form style={getFormStyles()} onSubmit={handleSubmit} noValidate>
                    <Paper style={{padding: 16}}>
                        <FormLabel>Адрес</FormLabel>
                        <Field
                            style={getFieldStyles()}
                            onChange={(event) => {
                                console.log(event.target.value)
                                setDest(event.target.value);
                                addr.dest = dest;
                            }}
                            fullWidth
                            required
                            name="dest"
                            component={TextField}
                            type="text"
                            placeholder={addr.dest}
                            value={addr.dest}
                        />

                        <FormLabel style={getLabelStyles()}>Цена</FormLabel>
                        <Field
                            style={getFieldStyles()}
                            onChange={(event) => {
                                addr.price = event.target.value;
                                setPrice(addr.price);
                            }}
                            fullWidth
                            required
                            name="price"
                            component={TextField}
                            type="text"
                            placeholder={addr.price}
                            value={addr.price}
                        />

                        <FormLabel style={getLabelStyles()}>Создатель</FormLabel>
                        <Field
                            onChange={(event) => {
                                addr.creator = event.target.value;
                                setCreator(addr.creator);
                            }}
                            fullWidth
                            required
                            name="creator"
                            style={getFieldStyles()}
                            component={TextField}
                            type="text"
                            placeholder={addr.creator}
                            value={addr.creator}
                        />

                        <TextField
                            onChange={(event) => {
                                console.log()
                                addr.date = event.target.value;
                                setDate(addr.date);
                            }}
                            fullWidth
                            style={getDataStyles()}
                            id="date"
                            label="Дата"
                            type="date"
                            value={date}
                            defaultValue={date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Select
                            fullWidth
                            style={getFieldStyles()}
                            name="status"
                            value={status}
                            label="Статус"
                            onChange={(event) => {
                                addr.status = event.target.value;
                                setStatus(addr.status);
                            }}>
                            <MenuItem value={"Новый"}>Новый</MenuItem>
                            <MenuItem value={"В работе"}>В работе</MenuItem>
                            <MenuItem value={"Куплен"}>Куплен</MenuItem>
                            <MenuItem value={"Архив"}>Архив</MenuItem>
                        </Select>

                        <Button style={getBtnStyles()}
                                variant="contained"
                                type="submit">
                            Сохранить
                        </Button>
                    </Paper>
                </form>
            )}
        />
    );
}

export default observer(AddrForm);
