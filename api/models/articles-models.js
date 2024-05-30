const db = require('../../db/connection');


exports.selectArticleById = (article_id)=> {
    return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id])
    .then(({ rows })=> {
      if(rows.length === 0){
        return Promise.reject({status: 404, msg: 'Article not found'})
      }
      return rows[0];
    })
  }

exports.selectArticles = ()=> {
  
  const dbQuery = `
  SELECT articles.author,
  articles.title,
  articles.article_id,
  articles.topic,
  articles.created_at,
  articles.votes,
  articles.article_img_url,
  COUNT(comments.comment_id):: integer AS comment_count
  FROM articles LEFT JOIN comments ON 
  articles.article_id = comments.article_id
  GROUP BY 
  articles.author, 
  articles.title, 
  articles.article_id, 
  articles.topic, 
  articles.created_at, 
  articles.votes, 
  articles.article_img_url
  ORDER BY articles.created_at DESC
  `

  return db.query(dbQuery)
  .then(({ rows })=> {
    return rows;
  })

}