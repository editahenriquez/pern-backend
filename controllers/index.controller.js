import {pool} from '../db.js';
export const ping = async(req,res,next)=>{
    try {
        const result = await pool.query(`select 'Welcome to PERN App' as result`);
        //console.log(result);
        res.json(result.rows[0]);
    }catch(err){
        next(err);
    }
}