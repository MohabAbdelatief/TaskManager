export interface Task {
    id: string;
    title: string;
    description?: string; // OPTIONAL
    isCompleted: boolean;
}