const knex = require('../database')

module.exports = {
  async index (req, res, next) {
    const { user_id } = req.query
    try {
      const query = knex('projects')

      if(user_id) {
        query
          .where({ user_id })
          .join('users', 'users.id', '=', 'projects.user_id')
          .select('projects.*', 'users.username')
      }

      const results = await query;
    
      return res.json(results)
    } catch (error) {
      next(error)
    }
  }
}