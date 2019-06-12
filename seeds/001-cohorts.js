
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'Full Stack Web Dev'},
        {name: 'Android'},
        {name: 'Data Science'},
        {name: 'Java Backend'},
        {name: 'UX Design'},
        {name: 'iOS Dev'}
      ]);
    });
};
