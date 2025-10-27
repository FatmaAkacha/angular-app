export interface Task {
id: string;
titre: string;
description?: string;
userEmail: string;
priorite: number; 
dueDate?: string; 
completed: boolean;
createdAt: string;
updatedAt?: string;
}