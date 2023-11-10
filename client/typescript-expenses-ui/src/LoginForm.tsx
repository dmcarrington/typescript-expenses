import { Button, Input } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface IProps {
    setUser: Dispatch<SetStateAction<string>>;
  }

const LoginForm = (props:IProps) => {
    const [name,setName] = useState('')
    return (
        <div>
            Name: <Input value={name} onChange={e=>setName(e.target.value)}></Input>
            <Button onClick={() => props.setUser(name)}>login</Button>
        </div>
        
    )
}

export default LoginForm