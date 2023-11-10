
import { Dispatch, SetStateAction, useState } from "react";

interface IProps {
    setUser: Dispatch<SetStateAction<string>>;
  }

const LoginForm = (props:IProps) => {
    const [name,setName] = useState('')
    return (
        <div>
            Name: <input value={name} onChange={e=>setName(e.target.value)}></input>
            <button onClick={() => props.setUser(name)}>login</button>
        </div>
        
    )
}

export default LoginForm