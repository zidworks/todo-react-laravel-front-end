import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import EDIT from '../../assets/edit.png';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
const btn={
    marginLeft:'3%',
    marginTop:'3%',
    padding:'3%'
}

 const CATEGORY ={
     width:'100%'
 }

class AlertDialogSlide extends React.Component {
  
  constructor(props){
    super(props)
  
      this.state = {
        open: false,
      };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  update=()=>{
    console.log("eidt props", this.props);
    let title_id = this.props.sendId
    let post = {
      title:this.state.title
    }
    axios({
      method: 'patch',
      url: API_BASE_URL + '/updatetitle/' + title_id,
      params: post,
      })
      .then(response =>{
        this.props.fetchData()
          if(response)
          {
            console.log("updated")
          }
      })
      .catch(err =>{
          console.log("not updated",err)
      });

    this.handleClose()
  }

  onChange =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div variant="outlined" color="primary" onClick={this.handleClickOpen}>
            <img src={EDIT} alt="" style={{height:'15px'}}/>
        </div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Edit Todos"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">

                <div style={{marginTop:'5px'}}>
                    <h3>Update your Title</h3>
                    <span style={{marginTop:'5px'}}>
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
                </div>
             
                    
                
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              cancel
            </Button>
            <Button onClick={this.update} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;