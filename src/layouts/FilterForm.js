import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDispatch, useSelector } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { activeFilter, changepaginationvisiblity } from "../actionCreator";
import { motion } from "framer-motion";
import Paper from "@material-ui/core/Paper"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "90%",
    maxWidth: "65vw"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect() {
    const classes = useStyles();
    const Gstate = useSelector(s=> s.entities.acudata)

    const [ state, setState ] = useState('');

    const handleChange = (event) => {
        setState(event.target.value);
    };

    const dispatch = useDispatch();
    const ClinicsState = useSelector(s=> s.entities.clinics);

    const handleSubmit = (event) =>{
        event.preventDefault();
        console.log("event truggerd")

        if( Gstate.acudata.pageheaderheading == "Clinics" ){
            dispatch(changepaginationvisiblity(true));
            dispatch(activeFilter( state ));
        }
        else{
            dispatch(activeFilter( state ));
        };
    };

    const MeridianList = Gstate.status === "loaded" ? 
            Gstate.list.filter(( elem, index )=>
                Gstate.list.findIndex( 
                    obj => obj.meridian === elem.meridian
                ) === index
        )
        .map((item)=>
        <MenuItem 
            key={item.meridian}
            id={item.meridian} 
            value={item.meridian}
            >{item.meridian}
        </MenuItem>
    ) : "Loading...." ;
    
    const CountryList = Gstate.acudata.pageheaderheading === 'Clinics' ? 
            ClinicsState.countrylist.map((item)=>         
                <MenuItem 
                    key={item}
                    id={item} >{item}
                </MenuItem> ) : null ;

    const View = Gstate.acudata.pageheaderheading === 'Clinics' ? CountryList : MeridianList  ;
    
  return (
    <Paper elevation={3} style={{paddingLeft:"1em", paddingTop:"1em", paddingBottom:"0.5em"}}>
    <Typography variant="h5">{ Gstate.acudata.filtername } </Typography><br />
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label" style={{ width: "4em" }}>
            { Gstate.acudata.filtername }
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={state}
          onChange={handleChange}
          label={ Gstate.acudata.filtername }
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            { View }
        </Select>

        <br /> 

        <div 
            style={{textAlign:"right"}}>
            <motion.button
                whileTap={{ scale: 0.7 }} 
                className="theme-btn border-0" 
                type="submit" 
                value="submit"
                onClick={(event)=> handleSubmit(event)}
                >
                <i className="la la-paper-plane"></i> 
                    Submit
            </motion.button>
        </div>
      </FormControl>
    </Paper>
  );
}
