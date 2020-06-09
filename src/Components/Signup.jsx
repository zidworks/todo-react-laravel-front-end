import React, { Component } from 'react';
import Background from '../assets/b1.jpg';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const sectionStyle = {
  width: "100%",
  height: "100vh",
  backgroundRepeat  : 'no-repeat',
  overflow: 'hidden',
  backgroundImage: `url(${Background})`
};

class AutoGrid extends Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      email:'',
      password:'',
      message:'',
    }
  this.onChange=this.onChange.bind(this);
  }
  onChange =(e)=>
  {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[e.target.name]: e.target.value});
  }
  onSubmit =(e) =>
    {
        e.preventDefault();
        const post = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        }
       //call action
       axios({
        method: 'post',
        url: API_BASE_URL + '/signup',
        params: post,
        })
        .then(response =>{
            if(response)
            {
              this.setState({message:'Signup successful',msgColor:'green'})
            }
            console.log(response);
        })
        .catch(response =>{
          if(response)
          {
            this.setState({message:'Signup failed',msgColor:'red'})
          }
          console.log(response);
        });
    }

  render() {
  const { classes } = this.props;

    return (
      <div className={classes.root} style={sectionStyle}>
        <Grid container spacing={24}>
          <Grid item sm={7}>
          </Grid>
          <Grid item sm >
            <Paper className={classes.paper}>
            <div  style={{marginBottom:'7%'}}>
            <span ><h1>ToDo List App</h1></span>

            </div>

               <Grid container spacing={24} style={{backgroundColor:'blue'}} justify='center'>
               <h2 style={{color:'white'}}>Sign up</h2>
               
               </Grid>
               <form onSubmit={this.onSubmit}>
                <div style={{marginTop:'5%'}}>
                  <TextField
                        placeholder="username"
                        id="username"
                        onChange={this.onChange}
                        value={this.state.username}
                        name="username" 
                        margin="normal"
                        variant="outlined"
                      />
                    </div>
                <div >
                  <TextField
                        id="email"
                        placeholder="email"
                        onChange={this.onChange}
                        value={this.state.email}
                        name="email" 
                        margin="normal"
                        variant="outlined"
                      />
                    </div>
                <div>
                      <TextField
                      type="password"
                        id="password"
                        placeholder="password"
                        onChange={this.onChange}
                        value={this.state.password}
                        name="password"    
                        margin="normal"
                        variant="outlined"
                      />
                    </div>
                <div style={{marginBottom:'5%',marginTop:'4%'}}>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                      SignUp
                    </Button>
                    </div>
               </form>
              <div style={{marginBottom:'5%'}}>
                <Link to="/"  style={{textDecoration:'none'}}>Already have an account</Link>
              </div>
              
              <div style={{marginBottom:'25%'}}>
                <span style={{color: this.state.msgColor}}>{this.state.message}</span>
              </div>
            
            </Paper>
          </Grid>
          
        </Grid>
      </div>
    );
  }
}
AutoGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoGrid);






