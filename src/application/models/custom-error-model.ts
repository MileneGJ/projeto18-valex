export class CustomError {
    message!: string;
    code!: string;
    additionalInfo!: any;
  
    constructor(message: string, code: string, additionalInfo: any = {}) {
      this.message = message;
      this.code = code;
      this.additionalInfo = additionalInfo
    }
  }