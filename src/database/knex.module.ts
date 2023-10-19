import knex, {Knex} from "knex";


class KnexModule {

    //INITIALIZE NEW KNEX FUNCTION AND RETURN IT
    connect(): Knex {
        const config = require("./knexfile");
        if (process.env.APP_ENV === "testing") {
            return knex(config.testing)
        }
        return knex(config.development);
    }
}

export default new KnexModule().connect();

