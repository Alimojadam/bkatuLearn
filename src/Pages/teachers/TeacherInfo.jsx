import student from '../../Pages/img/png.png';
import { cards } from '../coursPage/CardsInfo';

// لیست اولیه‌ی مدرس‌ها بدون courses
const baseTeachers = [
  {
    id: 1,
    name: "حسین شریف",
    study: "دکترای مخابرات",
    university: "صنعتی خاتم الانبیا بهبهان",
    aboutTeacher : "",
  },
  {
    id: 2,
    name: "اکبر کاظمی",
    study: "لیسانس کامپیوتر",
    university: "صنعتی خاتم الانبیا بهبهان",
    aboutTeacher : "",
  },
  {
    id: 3,
    name: "علی حسینی",
    study: "ارشد برق",
    university: "شیراز",
    aboutTeacher : "",
  },
  {
    id: 4,
    name: "یوسف قنبری",
    study: "لیسانس معماری",
    university: "شهید بهشتی",
    aboutTeacher : "",
  },
  {
    id: 5,
    name: "فیروز اکرمی",
    study: "لیسانس کامپیوتر",
    university: "صنعتی اصفهان",
    aboutTeacher : "",
  },
  {
    id: 6,
    name: "محمد کریمی",
    study: "لیسانس جانور شناسی",
    university: "صنعتی شریف",
    aboutTeacher : "",
  },
  {
    id: 7,
    name: "علی رضایی",
    study: "نامشخص",
    university: "نامشخص",
    aboutTeacher : "سلام، من علی هستم. لیسانس کامپیوتر دارم و برنامه‌نویسی همیشه برام جذابه. عاشق یادگیری چیزهای تازه‌ام و دوست دارم تو پروژه‌ها با انرژی و خلاقیت کار کنم. کار تیمی رو خیلی دوست دارم چون معتقدم وقتی کنار هم باشیم، می‌تونیم بهترین نتیجه‌ها رو بگیریم. هدفم اینه که هر روز بهتر بشم، تجربه کسب کنم و تو زمینه کاری‌ام موفق باشم.",
  },
  {
    id: 8,
    name: "نگار محمدی",
    study: "نامشخص",
    university: "نامشخص",
    aboutTeacher : "",
  }
];

// ادغام اطلاعات مدرس‌ها با دوره‌هایشان از فایل cards
export const teachers = baseTeachers.map(teacher => {
  const teacherCourses = cards.filter(card => card.teacher === teacher.name);
  return {
    ...teacher,
    image: student,
    activeCourses: "دوره فعال",
    NomberOFactiveCourses: teacherCourses.length.toString(),
    courses: teacherCourses
  };
});
