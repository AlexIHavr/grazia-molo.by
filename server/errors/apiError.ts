import { Request } from 'express';
import { validationResult } from 'express-validator';

class ApiError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }

  static UnrouteableAddress(email: string) {
    return new ApiError(
      550,
      `Почтовый адрес ${email} не существует. Проверьте правильность введеного почтового адреса`
    );
  }

  static Forbidden() {
    return new ApiError(403, 'У вас нет доступа');
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  static BadRequest(message: string) {
    return new ApiError(400, message);
  }

  static Locked(message: string) {
    return new ApiError(423, message);
  }

  static CheckValidationError(req: Request) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw this.BadRequest(errors.array()[0].msg);
    }
  }
}

export default ApiError;
