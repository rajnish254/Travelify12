import { Dialog, MenuItem, Grid, DialogTitle, DialogContent, FormControl, InputLabel, Select, DialogActions, Button } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './styles';
import Input from '../Utiles/Input';
import { postTravel } from '../../api/travel';

const AddTask = ({ isOpen, setIsOpen, data, setData }) => {

    const classes = useStyles();
    const [Filterdata, setFilterData] = useState(null);

    const handleSubmit = () => {
        let newdata = data;
        console.log(data);
        if (Filterdata.source) {
            newdata = newdata.filter((d) => d.source === Filterdata.source);
            setData(newdata);
        }
        if (Filterdata.destination) {
            newdata = newdata.filter((d) => d.destination === Filterdata.destination);
            setData(newdata);
        }
        if (Filterdata.AvailableSeats) {
            newdata = newdata.filter((d) => d.AvailableSeats >= Filterdata.AvailableSeats);
            setData(newdata);
        }
        if (Filterdata.ExpensePerHead) {
            newdata = newdata.filter((d) => d.ExpensePerHead <= Filterdata.ExpensePerHead);
            setData(newdata);
        }
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onClose={!isOpen} >
            <DialogTitle className={classes.dialog} >Filter Travels</DialogTitle>
            <DialogContent >
                <Grid container >
                    <Input margin="normal" name="Source" label="Source" handleChange={(e) => setFilterData({ ...Filterdata, source: e.target.value })} autoFocus half />
                    <Input margin="normal" name="destination" label="Destination" handleChange={(e) => setFilterData({ ...Filterdata, destination: e.target.value })} autoFocus half />
                    <Input margin="normal" name="ExpensePerHead" label="ExpensePerHead" handleChange={(e) => setFilterData({ ...Filterdata, ExpensePerHead: e.target.value })} autoFocus half />
                    <Input margin="normal" name="AvailableSeats" label="AvailableSeats" handleChange={(e) => setFilterData({ ...Filterdata, AvailableSeats: e.target.value })} autoFocus half />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={handleSubmit} >Filter</Button>
                <Button variant="outlined" color="secondary" onClick={() => setIsOpen(false)}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddTask;