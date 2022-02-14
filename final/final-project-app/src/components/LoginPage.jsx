import React, {useState} from 'react'

function LoginPage(props) {
    const [inputValue, setinputValue] = useState("");
    const [loginPrompt, setloginPrompt] = useState("");
    return (
        <div className="LoginPageDiv">
          <input className = 'UserNameInput' 
          placeholder = 'Enter Your Username'
          value = {inputValue}
          onInput={ (e) => setinputValue(e.target.value) }
          />
          <button className = 'LoginButton'
           onClick ={() => {
               if(inputValue === ''||inputValue.toUpperCase() === 'VUE'||inputValue.toUpperCase() === 'ANGULAR'){
                props.updateLoginStatus(false);
                setloginPrompt('UserName Cannot Be Vue or Angular or Null');
               }else{
                setloginPrompt('');
                props.updateLoginStatus(true);
                props.updateUserName(inputValue);
               }
               setinputValue("");  
               }}>Login</button>
               <span>{loginPrompt}</span>
        </div> 
    )
}

export default LoginPage
