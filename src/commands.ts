import {Db, ObjectId} from 'mongodb';
import { Task } from './models/Task';

export async function addTask(db: Db, task:{title:string, completed:boolean,createdAt:Date, DueDate?:Date, Description?:string, priority?: "Low" | "Medium" | "High"}) {
    const tasks = await db.collection<Task>('tasks');
    const result = await tasks.insertOne(task);
    console.log(result);
}

export async function listTasks(db:Db):Promise<void>{
    const tasks =await db.collection<Task>('tasks');
    const allTasks = await tasks.find().toArray();

    if(allTasks.length === 0){
        console.log("No tasks found");
    }else{
        console.log("All Tasks: ");
        allTasks.forEach((task,index)=>{
            const status = task.completed ? "Done" : "Pending";
            console.log(`${index + 1}. ${task.title}=>${status}`);
        });
    }
}

export async function deleteTask(db:Db,index:string):Promise<void>{
    const tasks = db.collection('tasks');
    try{
        const deletedtask = await tasks.deleteOne({_id: new ObjectId(index)});
        if(deletedtask.deletedCount === 1){
            console.log(`Task with id ${index} was deleted sucessfully`);
        }else{
            console.log(`Task with id ${index} was not found`); 
        }
    }catch(err){
        console.error("Error deleting task:", err);
    }
}
