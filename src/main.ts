import inquirer from "inquirer";
import { addTask,deleteTask,listTasks } from "./commands";
import { connectDb } from "./db";

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

async function main() {
    const db = await connectDb();
    
    const {action} = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add Task', 'List Tasks', 'Delete Task', 'Exit'],
        },        
    ]);

    if(action === 'Add Task'){

        const task = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter task title:',
                validate: (input: string)=>input.trim()!==''||'Title cannot be empty!!',
            },
            {
                type: 'input',
                name:'Description',
                message: 'Enter task description(optional):',
            },
            {
                type: 'input',
                name:'dueDate',
                message: 'Enter due date:',
                // format: ['mm', 'dd', 'yyyy', 'HH', 'MM'],
                validate: (date:string)=>date.trim()!==''||'no due date provided!!',
                
            },
        ]);
        

        await addTask(db,{
                title:task.title,
                Description:task.Description||'',
                completed:false,
                createdAt: new Date(),
                // DueDate: task.DueDate || "",
        });
    }

    if(action === "List Tasks"){
        await listTasks(db);
    }

    if(action === "Delete Task"){
        const {index} = await inquirer.prompt([
            {
                type: 'input',
                name: 'index',
                message: 'Enter the task ID to delete:',
                validate: (input) => input.trim() !== '' || 'Task ID cannot be empty!!',
            }
        ]);
        await deleteTask(db, index);
    }

    if(action !== "Exit"){
        main();
    }else{
        console.log("Exiting the application...");
        process.exit(0);
    
    }
}


main();