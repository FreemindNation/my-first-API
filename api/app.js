const express = require('express');
const { getTopics } = require('./controllers/topics-controllers');
const { handleGeneric404Errors, handleServerErrors, handleCustomErrors, handleSqlErrors } = require('./error-handling/handle-errors');
const { getEndpoints } = require('./controllers/endpoints-controllers');
const { getArticlesById } = require('./controllers/articles-controllers');

const app = express();




app.get('/api/topics', getTopics);

app.get('/api', getEndpoints);

app.get('/api/articles/:article_id', getArticlesById);






app.use(handleSqlErrors);

app.use(handleCustomErrors);

app.all('*', handleGeneric404Errors);

app.use(handleServerErrors);




















module.exports = app;


