# create course
npx sequelize-cli model:generate --name Course --attributes IdKursuSheets:string,Name:string,Price:integer,Category:string,HoursOfPractice:integer,StartDate:date,EndDate:date,AdditinalInfo:string,Status:string

npx sequelize-cli model:generate --name Student --attributes GSheetRef:string,Email:string,Name:string,Surname:string,Pesel:string,Mobile:string,AdditinalInfo:string,Status:string

npx sequelize-cli model:generate --name Lesson --attributes GSheetRef:string,LessonDate:date,StartTime:string,Duration:integer,AdditinalInfo:string,MigrationInfo:string

npx sequelize-cli model:generate --name CourseInstructor --attributes GSheetRef:string
npx sequelize-cli model:generate --name StudentCourse --attributes GSheetRef:string
npx sequelize-cli model:generate --name StudentCourseInstructor --attributes GSheetRef:string
npx sequelize-cli model:generate --name Payments --attributes GSheetRef:string,Amount:double,PaymentDate:date,AdditinalInfo:string