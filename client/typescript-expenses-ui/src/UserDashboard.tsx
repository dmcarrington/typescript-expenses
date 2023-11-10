import { Dispatch, SetStateAction, useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Date } from "mongoose";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;

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
    console.log(response)
    return response;
}

const UserDashboard = (props: IProps) => {
    const [expenseList, setExpenseList] = useState<IExpenseReport[]>();
    
    useEffect(() => {
        loadReports(props.user).then(list => {
            console.log(list)
            setExpenseList(list.data)
            console.log(expenseList)
        })
    }, [])

    return (
        <div>
            <h2> {props.user}'s expenses dashboard</h2>
            
            <h3>My Expense Reports</h3>
            {expenseList ?
                (
                    <p>
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
                    </p>
                ) : (
                    <p>"No reports found"</p>
                )}
            <button onClick={() => props.setUser('')}>logout</button>
        </div>
    )
}

export default UserDashboard