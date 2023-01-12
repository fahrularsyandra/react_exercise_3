# script

npx sequelize-cli model:generate --name Debt --attributes description:string,user_id:integer,amount:integer,status:integer
npx sequelize-cli model:generate --name Transaction --attributes description:string,user_id:integer,debt_id:integer,amount:integer,status:integer
npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,age:integer     