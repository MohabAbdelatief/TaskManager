"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let AppController = class AppController {
    constructor() {
        this.tasksServiceBaseUrl = 'http://localhost:3000/tasks';
    }
    async getTasks(res) {
        try {
            const response = await axios_1.default.get(this.tasksServiceBaseUrl);
            return res.status(common_1.HttpStatus.OK).send(response.data);
        }
        catch (error) {
            return res.status(error.response?.status || 500).send(error.response?.data || 'Error');
        }
    }
    async getTask(id, res) {
        try {
            const response = await axios_1.default.get(`${this.tasksServiceBaseUrl}/${id}`);
            return res.status(common_1.HttpStatus.OK).send(response.data);
        }
        catch (error) {
            return res.status(error.response?.status || 500).send(error.response?.data || 'Error');
        }
    }
    async createTask(body, res) {
        try {
            const response = await axios_1.default.post(this.tasksServiceBaseUrl, body);
            return res.status(common_1.HttpStatus.CREATED).send(response.data);
        }
        catch (error) {
            return res.status(error.response?.status || 500).send(error.response?.data || 'Error');
        }
    }
    async updateTask(id, body, res) {
        try {
            const response = await axios_1.default.patch(`${this.tasksServiceBaseUrl}/${id}`, body);
            return res.status(common_1.HttpStatus.OK).send(response.data);
        }
        catch (error) {
            return res.status(error.response?.status || 500).send(error.response?.data || 'Error');
        }
    }
    async deleteTask(id, res) {
        try {
            const response = await axios_1.default.delete(`${this.tasksServiceBaseUrl}/${id}`);
            return res.status(common_1.HttpStatus.OK).send(response.data);
        }
        catch (error) {
            return res.status(error.response?.status || 500).send(error.response?.data || 'Error');
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTasks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getTask", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createTask", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateTask", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteTask", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('tasks')
], AppController);
//# sourceMappingURL=app.controller.js.map