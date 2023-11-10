import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { getReportsByUser, addReport } from '../utils/mongo';

// Get all expense reports for this user
const getExpenseReports = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.params.username;
        const reports = await getReportsByUser(user)
        res.json(reports)
    } catch (err) {
        next(err)
    }
    
}

// Post a new expense report for this user
const addExpenseReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.params.username == "") {
            res.status(400).send("username required")
        }
        else if (req.body.description == undefined || req.body.amount == undefined) {
            res.status(400).send("description and amount required")
        } else {
            const response = await addReport(req.params.username, req.body.description, req.body.amount)
            res.json(response)
        }
        
    } catch (err) {
        next(err)
    }
}

export default {getExpenseReports, addExpenseReport}