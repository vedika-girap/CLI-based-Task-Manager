export interface Task {
  _id?: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  DueDate?: Date;
  Description?: string;
  priority?: "Low" | "Medium" | "High";
}