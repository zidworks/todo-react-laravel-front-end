import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import LOGOUT from '../../assets/logout.png'
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  button: {
    margin: theme.spacing.unit,
    color:'white'
  },
  input: {
    display: 'none',
  },
});
const show_grid ={
  fontSize:'30px',
  marginBottom:'0.5%',
  marginRight:'3%'
}
const logout ={
  height:'35px',
   margin:'15px'
}

class SearchAppBar extends React.Component {
  constructor(props){
    super(props)
    this.state={
      showBtn:true,
      redirect: false,
      search:''
    }
  }
  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[event.target.name]: event.target.value} );
    this.props.onChange(name, value);
}

  showHideGrid(){
    this.setState({showBtn:!this.state.showBtn})
  }
  logout=()=>{
    localStorage.removeItem('AUTH-TOKEN');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('TODO-TITLE-ID')
    this.setState({
      redirect: true
      })
  }
  
    render() {

      if (this.state.redirect === true) {
        return <Redirect to='/' />
    }

    const { classes } = this.props;
    return (
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              ToDo App
          </Typography>
          <div className={classes.grow} />
            {this.state.showBtn && (
              <Button onClick={(event) => { this.props.onClick(); this.showHideGrid();}} style={show_grid} className={classes.button}>+</Button>
            )}
            {!this.state.showBtn && (
              <Button onClick={(event) => { this.props.onClick(); this.showHideGrid();}}  style={show_grid} className={classes.button}>x</Button>
            )}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
              </div>
              <InputBase
               onChange={this.handleChange.bind(this)}
               name="search"
               value={this.state.search}
                placeholder="Search…"
                classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                }}
              />
            </div>
            <span>
              <img src={LOGOUT} onClick={this.logout} alt="logout" style={logout}/>
             </span>
            </Toolbar>
        </AppBar>
        </div>
    );
    }
}
SearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAppBar);