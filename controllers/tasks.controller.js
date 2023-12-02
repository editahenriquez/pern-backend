import {pool} from '../db.js';

const getTasks = async(req,res,next)=>{
    try {
        const result = await pool.query(`select * from task order by id asc`);
        //console.log(result);
        res.json(result.rows);
    }catch(err){
        next(err);
    }
};

const getTask = async(req, res, next) => {
    const {id} = req.params;
    try{
        const result = await pool.query(`select * from task where id = $1`,[id]);
        if(result.rows.length <=0) return next({status: 404, message: 'Task not found'});
        res.json(result.rows[0]);
    }catch(err){
        next(err);
    }
};

const createTask = async (req, res, next) => {
    const {title, description}= req.body;

    if(!title){
        return next({status: 400, message: 'Title cannot be empty'});
    }
    if(!description){
        return next({status: 400, message: 'Description cannot be empty'});
    }
    if(title.includes('<script>')){
        return next({status: 400, message: 'Invalid characters in the Title'});
    }
    if(description.includes('<script>')){
        return next({status: 400, message: 'Invalid characters in the Description'});
    }

    try {
        const result = await pool.query(`insert into task (title, description) values($1,$2) returning *`,[title, description]);
        res.json(result.rows[0]);
    }catch(err){
        next(err);
    }
};

const updateTasks = async (req, res, next) => {
    const {id} = req.params;
    const {title, description}= req.body;

    if(!title){
        return next({status: 400, message: 'Title cannot be empty'});
    }
    if(!description){
        return next({status: 400, message: 'Description cannot be empty'});
    }
    if(title.includes('<script>')){
        return next({status: 400, message: 'Invalid characters in the Title'});
    }
    if(description.includes('<script>')){
        return next({status: 400, message: 'Invalid characters in the Description'});
    }

    try {
        const result = await pool.query(`update task set title = COALESCE($1,title), description = COALESCE($2,description) where id = $3 returning *`,[title, description, id]);
        if(result.rows.length <=0) return next({status: 404, message: 'Task not found'});
        res.json(result.rows[0]);
    }catch(err){
        next(err);
    }
};

const toggleTasks = async (req, res, next) => {
    const {id} = req.params;
    const {done}= req.body;

    try {
        const result = await pool.query(`update task set done = $1 where id = $2 returning *`,[done, id]);
        if(result.rows.length <=0) return next({status: 404, message: 'Task not found'});
        res.json(result.rows[0]);
    }catch(err){
        next(err);
    }
};

const deleteTask = async (req, res,next) => {
    const {id} = req.params;
    try {
        const result = await pool.query(`delete from task where id = $1`,[id]);
        if(result.rowCount <=0) return next({status: 404, message: 'Task not found'}); 
        res.sendStatus(204);
    }catch(err){
        next(err);
    }
}

export {getTasks, getTask, createTask, updateTasks, toggleTasks, deleteTask}