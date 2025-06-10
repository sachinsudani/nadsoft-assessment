class ApiResponse {
    success: boolean;
    count?: number;
    data?: {};
    message?: string;

    constructor(statusCode: number, data?: {}, message?: string, count?: number) {
        this.success = statusCode < 400 ? true : false;
        this.data = data;
        this.count = count;
        this.message = message;
    }
}

export { ApiResponse };
