import * as yup from 'yup'

export const userSchema = yup.object({
  fullName: yup
    .string()
    .required('ФИО обязательно')
    .max(50, 'ФИО не может превышать 50 символов'),

  email: yup
    .string()
    .required('Email обязателен')
    .email('Некорректный email')
    .max(100, 'Email не может превышать 100 символов'),

  phone: yup
    .string()
    .required('Телефон обязателен')
    .matches(/^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/, 'Формат: +7-999-123-45-67')
    .max(18, 'Телефон не может превышать 18 символов'),

  dateOfBirth: yup
    .date()
    .required('Дата рождения обязательна')
    .max(new Date(), 'Дата не может быть в будущем')
})