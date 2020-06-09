import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import EDIT from '../../assets/edit.png';
import EDITT from './Edit';

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
    deleteTodo=(ind)=>{
        let i =ind
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
      };

    render() {
        let x =Object.values(this.props.sendList)
        console.log(x)
        return (
        <ul>
            {this.props.sendList && this.props.sendList.map((item,ind) => {
                return(
                    <div>
                        <div>-----------------</div>
                        {item.item_content}
                    </div>
                )
            }
            )}
        </ul>
        
        )
    }
}
export default Test;