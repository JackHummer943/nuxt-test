import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, UserCreate } from '@/entities/user/model/types'
import { userSchema } from '@/entities/user/model/schema'

const testData: User[] = [
  { id: '1', fullName: 'Иван Иванов', dateOfBirth: '1990-05-15', email: 'ivanov@example.com', phone: '+7-999-123-45-67' },
  { id: '2', fullName: 'Анна Петрова', dateOfBirth: '1985-12-03', email: 'petrova@example.com', phone: '+7-999-234-56-78' },
  { id: '3', fullName: 'Алексей Сидоров', dateOfBirth: '1995-07-22', email: 'sidorov@example.com', phone: '+7-999-345-67-89' },
  { id: '4', fullName: 'Дмитрий Кузнецов', dateOfBirth: '1980-08-10', email: 'kuznetsov@example.com', phone: '+7-999-456-78-90' },
  { id: '5', fullName: 'Ольга Смирнова', dateOfBirth: '1992-03-25', email: 'smirnova@example.com', phone: '+7-999-567-89-01' },
  { id: '6', fullName: 'Александр Фёдоров', dateOfBirth: '1988-11-07', email: 'fedorov@example.com', phone: '+7-999-678-90-12' },
  { id: '7', fullName: 'Марина Васильева', dateOfBirth: '1997-09-18', email: 'vasileva@example.com', phone: '+7-999-789-01-23' },
  { id: '8', fullName: 'Павел Новиков', dateOfBirth: '1983-06-21', email: 'novikov@example.com', phone: '+7-999-890-12-34' },
  { id: '9', fullName: 'Светлана Алексеева', dateOfBirth: '1993-04-12', email: 'alekseeva@example.com', phone: '+7-999-901-23-45' },
  { id: '10', fullName: 'Михаил Николаев', dateOfBirth: '1987-01-17', email: 'nikolaev@example.com', phone: '+7-999-012-34-56' },
  { id: '11', fullName: 'Елена Романова', dateOfBirth: '1991-02-28', email: 'romanova@example.com', phone: '+7-999-123-45-67' },
  { id: '12', fullName: 'Кирилл Павлов', dateOfBirth: '1986-09-14', email: 'pavlov@example.com', phone: '+7-999-234-56-78' },
  { id: '13', fullName: 'Дарья Семёнова', dateOfBirth: '1994-03-21', email: 'semenova@example.com', phone: '+7-999-345-67-89' },
  { id: '14', fullName: 'Артём Соловьёв', dateOfBirth: '1989-11-10', email: 'soloviev@example.com', phone: '+7-999-456-78-90' },
  { id: '15', fullName: 'Владислав Матвеев', dateOfBirth: '1996-06-03', email: 'matveev@example.com', phone: '+7-999-567-89-01' },
  { id: '16', fullName: 'Станислав Гончаров', dateOfBirth: '1984-02-18', email: 'goncharov@example.com', phone: '+7-999-678-90-12' },
  { id: '17', fullName: 'Любовь Орлова', dateOfBirth: '1998-08-05', email: 'orlova@example.com', phone: '+7-999-789-01-23' },
  { id: '18', fullName: 'Роман Волков', dateOfBirth: '1982-05-29', email: 'volkov@example.com', phone: '+7-999-890-12-34' },
  { id: '19', fullName: 'Алёна Андреева', dateOfBirth: '1999-01-12', email: 'andreeva@example.com', phone: '+7-999-901-23-45' },
  { id: '20', fullName: 'Борис Ильин', dateOfBirth: '1981-07-07', email: 'ilin@example.com', phone: '+7-999-012-34-56' },
  { id: '21', fullName: 'Татьяна Борисова', dateOfBirth: '1993-10-14', email: 'borisova@example.com', phone: '+7-999-123-45-67' },
  { id: '22', fullName: 'Денис Егоров', dateOfBirth: '1987-04-23', email: 'egorychev@example.com', phone: '+7-999-234-56-78' },
  { id: '23', fullName: 'Елизавета Серёгина', dateOfBirth: '1995-12-08', email: 'seryogina@example.com', phone: '+7-999-345-67-89' },
  { id: '24', fullName: 'Василий Герасимов', dateOfBirth: '1989-06-16', email: 'gerasimov@example.com', phone: '+7-999-456-78-90' },
  { id: '25', fullName: 'Константин Ершов', dateOfBirth: '1997-02-22', email: 'ershov@example.com', phone: '+7-999-567-89-01' },
  { id: '26', fullName: 'Наталия Савинова', dateOfBirth: '1992-11-03', email: 'savinova@example.com', phone: '+7-999-678-90-12' },
  { id: '27', fullName: 'Семён Яковлев', dateOfBirth: '1984-03-17', email: 'yakovlev@example.com', phone: '+7-999-789-01-23' },
  { id: '28', fullName: 'Юлия Ковалёва', dateOfBirth: '1996-07-25', email: 'kovaeva@example.com', phone: '+7-999-890-12-34' },
  { id: '29', fullName: 'Арсений Воронов', dateOfBirth: '1988-12-01', email: 'voronov@example.com', phone: '+7-999-901-23-45' },
  { id: '30', fullName: 'Александра Максимова', dateOfBirth: '1991-05-19', email: 'maksimova@example.com', phone: '+7-999-012-34-56' },
  { id: '31', fullName: 'Никита Гусев', dateOfBirth: '1986-09-28', email: 'gusev@example.com', phone: '+7-999-123-45-67' },
  { id: '32', fullName: 'Анжела Воробьева', dateOfBirth: '1994-04-13', email: 'vorobyeva@example.com', phone: '+7-999-234-56-78' },
  { id: '33', fullName: 'Евгений Сухарев', dateOfBirth: '1982-11-06', email: 'sukharev@example.com', phone: '+7-999-345-67-89' },
  { id: '34', fullName: 'Вероника Зайцева', dateOfBirth: '1997-08-29', email: 'zaiceva@example.com', phone: '+7-999-456-78-90' },
  { id: '35', fullName: 'Антон Голубев', dateOfBirth: '1985-01-15', email: 'golubev@example.com', phone: '+7-999-567-89-01' },
  { id: '36', fullName: 'Катерина Кирсанова', dateOfBirth: '1993-06-10', email: 'kirsanova@example.com', phone: '+7-999-678-90-12' },
  { id: '37', fullName: 'Леонид Колесников', dateOfBirth: '1989-03-22', email: 'kolesnikov@example.com', phone: '+7-999-789-01-23' },
  { id: '38', fullName: 'Жанна Павлова', dateOfBirth: '1995-12-18', email: 'pavlova@example.com', phone: '+7-999-890-12-34' },
  { id: '39', fullName: 'Максим Терехов', dateOfBirth: '1987-09-03', email: 'terehhov@example.com', phone: '+7-999-901-23-45' },
  { id: '40', fullName: 'Наталья Леонтьева', dateOfBirth: '1990-02-25', email: 'leonteva@example.com', phone: '+7-999-012-34-56' },
  { id: '41', fullName: 'Ростислав Тарасов', dateOfBirth: '1983-07-11', email: 'tarasov@example.com', phone: '+7-999-123-45-67' },
  { id: '42', fullName: 'Карина Казакова', dateOfBirth: '1998-04-09', email: 'kazakova@example.com', phone: '+7-999-234-56-78' },
  { id: '43', fullName: 'Глеб Федотов', dateOfBirth: '1981-10-27', email: 'fedotov@example.com', phone: '+7-999-345-67-89' },
  { id: '44', fullName: 'Полина Макарова', dateOfBirth: '1992-05-16', email: 'makarova@example.com', phone: '+7-999-456-78-90' },
  { id: '45', fullName: 'Владимир Дмитриев', dateOfBirth: '1986-12-02', email: 'dmitriev@example.com', phone: '+7-999-567-89-01' },
  { id: '46', fullName: 'Людмила Михайлова', dateOfBirth: '1994-08-19', email: 'mikhaylova@example.com', phone: '+7-999-678-90-12' },
  { id: '47', fullName: 'Евгений Крючков', dateOfBirth: '1980-01-08', email: 'kryuchkov@example.com', phone: '+7-999-789-01-23' },
  { id: '48', fullName: 'Тамара Яковлева', dateOfBirth: '1996-06-24', email: 'yakoveva@example.com', phone: '+7-999-890-12-34' },
  { id: '49', fullName: 'Алексей Гордеев', dateOfBirth: '1987-03-14', email: 'gordeev@example.com', phone: '+7-999-901-23-45' },
  { id: '50', fullName: 'Алина Филиппова', dateOfBirth: '1991-11-30', email: 'philippova@example.com', phone: '+7-999-012-34-56' },
  { id: '51', fullName: 'Матвей Никитин', dateOfBirth: '1984-09-21', email: 'nikitin@example.com', phone: '+7-999-123-45-67' },
  { id: '52', fullName: 'Анастасия Чернышёва', dateOfBirth: '1997-02-17', email: 'chernysheva@example.com', phone: '+7-999-234-56-78' },
  { id: '53', fullName: 'Тимофей Бобров', dateOfBirth: '1982-05-05', email: 'bobrov@example.com', phone: '+7-999-345-67-89' },
  { id: '54', fullName: 'Инна Евсеева', dateOfBirth: '1993-10-12', email: 'evseeva@example.com', phone: '+7-999-456-78-90' },
  { id: '55', fullName: 'Лев Сафронов', dateOfBirth: '1988-07-28', email: 'safronov@example.com', phone: '+7-999-567-89-01' },
  { id: '56', fullName: 'Раиса Осипова', dateOfBirth: '1995-01-04', email: 'osipova@example.com', phone: '+7-999-678-90-12' },
  { id: '57', fullName: 'Геннадий Карпов', dateOfBirth: '1985-12-15', email: 'karpov@example.com', phone: '+7-999-789-01-23' },
  { id: '58', fullName: 'Регина Маркова', dateOfBirth: '1990-09-07', email: 'markova@example.com', phone: '+7-999-890-12-34' },
  { id: '59', fullName: 'Ян Селиверстов', dateOfBirth: '1983-06-23', email: 'selivertstov@example.com', phone: '+7-999-901-23-45' },
  { id: '60', fullName: 'Ангелина Афанасьева', dateOfBirth: '1998-03-11', email: 'afanasieva@example.com', phone: '+7-999-012-34-56' },
  { id: '61', fullName: 'Владислав Белов', dateOfBirth: '1987-11-20', email: 'belov@example.com', phone: '+7-999-123-45-67' },
  { id: '62', fullName: 'Евгения Степанова', dateOfBirth: '1992-08-06', email: 'stepanova@example.com', phone: '+7-999-234-56-78' },
  { id: '63', fullName: 'Илья Громов', dateOfBirth: '1989-04-19', email: 'gromov@example.com', phone: '+7-999-345-67-89' },
  { id: '64', fullName: 'Нина Сергеева', dateOfBirth: '1996-01-27', email: 'sergeeva@example.com', phone: '+7-999-456-78-90' },
  { id: '65', fullName: 'Ирина Гришина', dateOfBirth: '1984-07-13', email: 'grishina@example.com', phone: '+7-999-567-89-01' },
  { id: '66', fullName: 'Алексей Жуков', dateOfBirth: '1991-02-22', email: 'zhukov@example.com', phone: '+7-999-678-90-12' },
  { id: '67', fullName: 'Анна Крылова', dateOfBirth: '1999-10-05', email: 'krylova@example.com', phone: '+7-999-789-01-23' },
  { id: '68', fullName: 'Руслан Рябинин', dateOfBirth: '1982-05-17', email: 'ryabinin@example.com', phone: '+7-999-890-12-34' },
  { id: '69', fullName: 'Оксана Цветкова', dateOfBirth: '1995-12-09', email: 'cvetkova@example.com', phone: '+7-999-901-23-45' },
  { id: '70', fullName: 'Дмитрий Доронин', dateOfBirth: '1988-08-24', email: 'doronin@example.com', phone: '+7-999-012-34-56' },
  { id: '71', fullName: 'Илона Назарова', dateOfBirth: '1993-03-11', email: 'nazarova@example.com', phone: '+7-999-123-45-67' },
  { id: '72', fullName: 'Артём Лаврентьев', dateOfBirth: '1986-11-18', email: 'lavrentiev@example.com', phone: '+7-999-234-56-78' },
  { id: '73', fullName: 'Елена Тихонова', dateOfBirth: '1997-06-29', email: 'tihonova@example.com', phone: '+7-999-345-67-89' },
  { id: '74', fullName: 'Олег Денисов', dateOfBirth: '1983-04-07', email: 'denisov@example.com', phone: '+7-999-456-78-90' },
  { id: '75', fullName: 'Варвара Медведева', dateOfBirth: '1990-09-15', email: 'medvedeva@example.com', phone: '+7-999-567-89-01' },
  { id: '76', fullName: 'Иван Горелов', dateOfBirth: '1987-01-21', email: 'gorelov@example.com', phone: '+7-999-678-90-12' },
  { id: '77', fullName: 'Дарья Русакова', dateOfBirth: '1994-07-03', email: 'rusakova@example.com', phone: '+7-999-789-01-23' },
]

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>(testData)

  const addUser = async (data: UserCreate): Promise<User> => {
    await userSchema.validate(data, { abortEarly: false })
    const newUser: User = { ...data, id: Date.now().toString() }
    users.value.push(newUser)
    return newUser
  }

  const updateUser = async (id: string, data: Omit<Partial<UserCreate>, 'id'>): Promise<void> => {
    const fields = Object.keys(data) as (keyof typeof data)[]
    if (fields.length === 0) return

    const partialSchema = userSchema.pick(fields)
    await partialSchema.validate(data, { abortEarly: false })

    const idx = users.value.findIndex(u => u.id === id)
    if (idx !== -1) {
      users.value[idx] = {
        ...users.value[idx],
        ...data
      } as User
    }
  }

  const deleteUser = (id: string): void => {
    users.value = users.value.filter(u => u.id !== id)
  }

  const getUserById = (id: string): User | undefined => {
    return users.value.find(u => u.id === id)
  }

  return { users, addUser, updateUser, deleteUser, getUserById }
})