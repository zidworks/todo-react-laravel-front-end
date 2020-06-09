import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import EDIT from '../../assets/edit.png';
import EDITT from './Edit';
import TitleListView from './TitleListView'
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const cancel = {
    float: 'right',
    backgroundColor: 'red',
    padding: '3px',
    color: 'white',
    marginLeft: '5px',
    fontWeight: 'bold'
}

class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.sendData,
            checkedA: [true],
        }
    }
    deleteTodo=(id)=>{
        console.log("props====>",this.props);
        let title_id =id
        axios({
            method: 'delete',
            url: API_BASE_URL + '/title/' + title_id,
            })
            .then(response =>{
                this.props.fetchData()
                if(response)
                {
                }
            })
            .catch(response =>{
                if(response)
                {
                }
            }
        );
           
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    render() {
        return (
        <ul>
            {this.props.sendData && this.props.sendData.map((item,ind) => {
                let x = item.list_id
                let id = item.id
                let ser = this.props.searchData
                if ( /[$&+,:;=?@#|'[(<>.^*()%!]/.test(ser)) {
        
                    this.setState({
                        search:''
                    })
                    return false;
                }
                else if(/^(\\)$/.test(ser))
                {
                    this.setState({
                        search:''
                    })
                    return false;
                }
                else {
                    let title=item.Title.toLowerCase();
                    let result = title.match(this.props.searchData.toLowerCase());
                    if (result !== null) {
                        return(<li className="li">
                            <a href="#" className="a">
                                <div className="box">
                                    <p className="bet_time" > <EDITT fetchData={()=>{this.props.fetchData()}} sendId={item.id}/></p>
                                </div>
                                <span onClick={this.deleteTodo.bind(this,id)} style={cancel}>x</span>
                                <div style={{marginTop:'8%'}}>
                                    <h2 className="h2" style={{ fontWeight: 'bold' }}>{item.Title}</h2>
                                </div>
                                <p className="p">{item.created_at}</p>
                                <TitleListView  sendList={item.items}/>
                            </a>
                        </li>
                        )
                     }
                }
            }
            )}
        </ul>
        )
    }
}
export default Test;