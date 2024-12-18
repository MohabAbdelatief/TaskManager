export declare class AppController {
    private tasksServiceBaseUrl;
    getTasks(res: any): Promise<any>;
    getTask(id: string, res: any): Promise<any>;
    createTask(body: any, res: any): Promise<any>;
    updateTask(id: string, body: any, res: any): Promise<any>;
    deleteTask(id: string, res: any): Promise<any>;
}
