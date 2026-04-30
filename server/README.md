# Server

## תיאור
שרת Node.js שמנהל:
- מורות ותלמידות
- הרשאות (JWT)
- שמירת מיקומים
- חישוב מרחקים
- בדיקות תקינות קלט

---

## טכנולוגיות
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- JWT

---

## API עיקרי

### Auth
- POST /auth/manager-login
- POST /auth/teacher-login

### Teachers
- POST /teachers
- GET /teachers
- GET /teachers/by-name
- GET /teachers/:idNumber/students

### Students
- POST /students
- GET /students
- GET /students/by-name

### Locations
- POST /locations
- GET /locations
- GET /locations/far-from-teacher/:teacherId

---

## מיקומים

- שמירת מיקום אחרון לכל משתמש
- חישוב מרחק בין מורה לתלמידה
- זיהוי תלמידות רחוקות (>3 ק״מ)

---

## סימולטור מיקומים

קיים סקריפט המדמה מכשירי איכון ששולחים מיקום כל דקה.
הסקריפט נועד להדגים את מערכת המעקב גם ללא מכשירי GPS אמיתיים.

### איך להריץ:

```bash
npx ts-node src/scripts/locationSimulator.ts