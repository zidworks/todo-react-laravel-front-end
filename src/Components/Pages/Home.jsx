import Header from '../Header/Header';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ViewTodoItems from './ViewTodoItems';
import './stickynotes.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { API_BASE_URL } from '../../config';
import TEST from './Test'

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});
const btn={
    marginLeft:'3%',
    marginTop:'3%',
    padding:'3%'
}
const gridMargin={
  margin:'1%'
}

class AutoGrid extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todos:[],
            // for todo title and category
            categories:'',
            title:'',

            // for todo list items
            listItems:'',

            showGrid:false,
            showItemBox:false,
            search:''
           }
    }
    onChange =(e)=>{
      const name = e.target.name;
      const value = e.target.value;
      this.setState({[e.target.name]: e.target.value});
    }
    componentDidMount(){
     
       this.fetchingData()
    }

    fetchingData =()=>{
      axios({
        method: 'get',
        url: API_BASE_URL + '/alltitle/'+ localStorage.getItem('USER_ID'),
        // params: post,
        //config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response =>{
            if(response)
            {
              this.setState({todos:response.data.login},()=>{this.DataLoader()})
            }
        })
        .catch(response =>{
          if(response)
          {
          }
          console.log(response);
        });
    }
      
    DataLoader = () =>{
      let x = this.state.todos
    }

    titleSaved=(e)=>{

      e.preventDefault();
      const post = {
        Category_id: this.state.categories,
        Title: this.state.title,
        user_id: localStorage.getItem('USER_ID')
      }
       //call action
       axios({
        method: 'get',
        url: API_BASE_URL + '/addtitle',
        params: post,
        })
        .then(response =>{
            if(response)
            {
              let todo_title_id=Object.values(response.data.login)
              // let USER_ID = id
              let TODO_TITLE_ID = todo_title_id[5]
              localStorage.setItem('TODO-TITLE-ID' , TODO_TITLE_ID)
              this.fetchingData()
            }
        })
        .catch(response =>{
          if(response)
          {
          }
        });

      this.setState({
        showItemBox:true,
        categories:'',
        title:'',
      })
      
      this.fetchingData()
   }

   showGridBox=(event)=>{
     this.setState({
       showGrid:!this.state.showGrid,
       showItemBox:false
     })
     localStorage.removeItem('TODO-TITLE-ID')
   }

   AddItems=(e) =>{
    e.preventDefault();
    const post = {
      list_id: localStorage.getItem('TODO-TITLE-ID'),
      item_content: this.state.listItems,
    }
    console.log(post)
     //call action
     axios({
      method: 'get',
      url: API_BASE_URL + '/addlist',
      params: post,
      })
      .then(response =>{
          if(response)
          {
          }
      })
      .catch(response =>{
        if(response)
        {
        }
      });
      this.fetchingData();
      this.EmptyFields();
   }

   EmptyFields()
   {
       this.setState({
           listItems:''
       })
   }

   onChangeSearch(field, value) {
    // parent class change handler is always called with field name and value
    debugger
    this.setState({search: value});
    debugger
}
   

render() {
  const { classes } = this.props;

  return (
      <div>
          <Header  onChange={this.onChangeSearch.bind(this)}  onClick={this.showGridBox}/>
        <div className={classes.root}>
            <Grid container >
                {this.state.showGrid && (
                  <Grid item sm={4} style={gridMargin}>
                    <Paper className={classes.paper}>
                  {!this.state.showItemBox && (
                    <div>
                      <h3> Add Todo Title</h3>
                      <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                          <InputLabel
                            ref={ref => {
                              this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                          >
                            Categories
                          </InputLabel>
                          <Select
                            value={this.state.categories}
                            onChange={this.onChange}
                            name="categories"
                            
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="1">Travelling</MenuItem>
                            <MenuItem value="2">Shopping</MenuItem>
                            <MenuItem value="3">Cooking</MenuItem>
                            <MenuItem value="4">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <span>
                        <TextField
                          id="title"
                          placeholder="Name of todo..."
                          onChange={this.onChange}
                          value={this.state.title}
                          name="title" 
                          margin="normal"
                          variant="outlined"
                        />
                      </span>
                      <span >
                          <Button onClick={this.titleSaved} style={btn} variant="contained" color="primary" className={classes.button}>
                            Add Title
                          </Button>
                        </span>
                    </div>
                  )}
                  {this.state.showItemBox && (
                    <div>
                      <h3>Now add your items here</h3>
                      <span>
                        <TextField
                          id="listItems"
                          placeholder="Items here..."
                          onChange={this.onChange}
                          value={this.state.listItems}
                          name="listItems" 
                          margin="normal"
                          variant="outlined"
                        />
                      </span>
                      <span >
                        <Button onClick={this.AddItems} style={btn} variant="contained" color="primary" className={classes.button}>
                          Add Item
                        </Button>
                      </span>
                    </div>
                  )}
                  </Paper>
                  </Grid>
                )}

<               Grid item sm style={gridMargin}>
                  <Paper className={classes.paper}>
                    <h3> Todos List</h3>
                    <div>
                      {/* here we write todo items list */}
                      <div className="body">
                          <ul className="ul">
                          <TEST 
                            searchData={this.state.search}
                            sendData={this.state.todos}
                            fetchData={()=>{this.fetchingData()}}
                          />
                      
                          </ul>
                        </div>
                    </div>
                  </Paper>
                </Grid>
                
            </Grid>
         
        </div>
    
      </div>
  );
}
}
AutoGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AutoGrid);
