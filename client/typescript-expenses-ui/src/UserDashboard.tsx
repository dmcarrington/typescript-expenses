import { Dispatch, SetStateAction, useState, useEffect } from "react";
import axios from "axios";
import { Date } from "mongoose";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Input } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;

export interface NewExpenseDialogProps {
    open: boolean;
    onCancel: () => void;
    onSave: (username: string, description: string, amount: Number) => void;
    username: string
  }

function NewExpenseDialog(props: NewExpenseDialogProps) {
    const { onCancel, onSave, open, username } = props;
  
    const handleClose = () => {
      onCancel();
    };
    
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0.0)

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Add Expense Report</DialogTitle>
        <p>Expense Description: <Input value={description} onChange={e => setDescription(e.target.value)}></Input></p>
        <p>Expense Amount: <Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))}></Input></p>
        <Button onClick={() => onSave(username, description, amount)}>Submit</Button><Button onClick={() => onCancel()}>Cancel</Button>
      </Dialog>
    );
  }

interface IProps {
    user: string;
    setUser: Dispatch<SetStateAction<string>>;
}

interface IExpenseReport {
    originatorName: string,
    description: string,
    amount: number,
    dateSubmitted: Date
}
  
async function loadReports(username: string) {
    const response = await axios.get<IExpenseReport[]>("user/" + username + "/expenses");
    return response;
}

const UserDashboard = (props: IProps) => {
    const [expenseList, setExpenseList] = useState<IExpenseReport[]>();
    const [added, setAdded] = useState(0);
    
    useEffect(() => {
        loadReports(props.user).then(list => {
            setExpenseList(list.data)
        })
    }, [added])

    const [open, setOpen] = useState(false)
    const handleCancel = () => {
        setOpen(false)
    }

    const handleSave = async (username: string, description: string, amount: Number) => {
        const response = await axios({
            method: "post",
            url: "user/" + username + "/add_expense",
            data: { "description":  description , "amount": amount },
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response)
        setOpen(false)
        setAdded(added + 1)
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    return (
        <div>
            <h2> {props.user}'s expenses dashboard</h2>
            
            <h3>My Expense Reports</h3>
            {expenseList ?
                (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Date</TableCell>
                                </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenseList.map(m => (<TableRow><TableCell>{m.description}</TableCell><TableCell>{m.amount}</TableCell><TableCell>{m.dateSubmitted.toString()}</TableCell></TableRow>))}
                        </TableBody>
                    </Table>
                ) : (
                    <p>"No reports found"</p>
                )}
            <Button onClick={handleClickOpen}>Add</Button>
            <NewExpenseDialog open={open} onCancel={handleCancel} onSave={handleSave} username={props.user}></NewExpenseDialog>
            <Button onClick={() => props.setUser('')}>logout</Button>
        </div>
    )
}

export default UserDashboard