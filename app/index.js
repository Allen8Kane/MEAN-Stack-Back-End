//#region подключение библиотек
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const dbConnect = require('./config/dbConnect');
const account = require('./routes/account');

//#endregion

//#region настройка проекта?
const app = express();

const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors())

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
//#endregion

//#region Подключение к БД
mongoose.connect(dbConnect.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log("Подключение к БД прошло успешно");
});
mongoose.connection.on('error', (err) => {
  console.log("Не удалось подключится к БД: " + err);
});

//#endregion

//#region обработка URL адресов
app.get('/', (req, res) => {
  res.send('Main Page')
});

app.use('/account', account);
//#endregion

app.listen(port, () => {
  console.log(`Сервер был запущен: http://localhost:${port}`);
})
