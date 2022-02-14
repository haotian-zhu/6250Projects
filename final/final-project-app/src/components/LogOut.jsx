import React from 'react';

function LogOut(props) {
    return (
        <div className = "LogoutButtonDiv">
           <button className = "LogoutButton" onClick = {
           () => {props.changeStatus(false);}
           }>LogOut</button>
        </div>
    )
}

export default LogOut;
