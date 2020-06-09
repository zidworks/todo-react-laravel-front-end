import React from "react";

const cancel={
    float:'right', 
    backgroundColor:'red',
    padding:'3px',
    color:'white',
    marginLeft:'5px',
    fontWeight:'bold'
}

const ViewTodoItems = (props) => {
    return (
        <li className="li">
            <a href="#" className="a">
            <span style={cancel}>x</span>
                <span>
                    <h2 className="h2" style={{fontWeight:'bold'}}>{props.title}</h2>
                </span>
                <p className="p">Text Content #1</p>
                <p className="p">Text Content #1</p>
                <p className="p">Text Content #1</p>
                <div>hel</div>
            </a>
        </li>
    )
};
export default ViewTodoItems;