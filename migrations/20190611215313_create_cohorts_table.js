// new changes to db schema

exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(tbl) {
        tbl.increments();
        tbl.string('name', 128)
        .notNullable()
        .unique()
    });
};

// how to undo changes to schema
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts');
};
