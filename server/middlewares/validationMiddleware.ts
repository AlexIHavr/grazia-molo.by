import { body } from 'express-validator';

const validationMiddleware = (fields: string[]) => {
  const stackFields: Function[] = [];
  fields.forEach((field) => {
    switch (field) {
      case 'subCategory':
        stackFields.push(() =>
          body(field)
            .trim()
            .isLength({ max: 50 })
            .withMessage('Имя подкатегории не должно превышать 50 символов')
        );
        break;
      case 'name':
      case 'section':
        stackFields.push(() =>
          body(field)
            .trim()
            .notEmpty()
            .withMessage('Имя не должно быть пустым')
            .isLength({ max: 100 })
            .withMessage('Имя не должно превышать 100 символов')
        );
        break;
      case 'text':
        stackFields.push(() =>
          body(field)
            .trim()
            .notEmpty()
            .withMessage('Комментарий не должнен быть пустым')
            .isLength({ max: 1000 })
            .withMessage('Комментарий не должен превышать 1000 символов')
        );
        break;
      case 'phone':
        stackFields.push(() =>
          body(field)
            .trim()
            .isMobilePhone('any')
            .withMessage('Телефон указан некорректно. Телефон не должен содержать пробелы')
        );
        break;
      case 'age':
        stackFields.push(() =>
          body(field)
            .trim()
            .matches(/^[1-9][0-9]?$/i)
            .withMessage('Возраст указан некорректно')
        );
        break;
      case 'fullName':
        stackFields.push(() =>
          body(field)
            .trim()
            .matches(/^[А-ЯёЁ]+\s[А-ЯёЁ]+$/i)
            .withMessage(
              'Полное имя указано некорректно. Полное имя указывается в формате: "Фамилия Имя"'
            )
            .isLength({ max: 30 })
            .withMessage('Полное имя не должно превышать 30 символов')
        );
        break;
      case 'password':
        stackFields.push(() =>
          body(field)
            .isLength({ min: 6 })
            .withMessage('Длина пароля должна быть не менее 6 символов')
            .isLength({ max: 16 })
            .withMessage('Длина пароля не должна превышать 16 символов')
        );
        break;
      case 'email':
        stackFields.push(() =>
          body(field).trim().isEmail().withMessage('Почтовый адрес указан некорректно')
        );
        break;
      case 'year':
        stackFields.push(() =>
          body(field)
            .trim()
            .matches(/^[0-9]{4}$/)
            .withMessage('Год указан некорректно')
        );
        break;
    }
  });

  return stackFields.map((f) => f());
};

export default validationMiddleware;
