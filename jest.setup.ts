import KnexModule from "./src/database/knex.module";

export const setupTestDatabase = async () => {
    await KnexModule.migrate.rollback({
        directory: './src/database/migrations'
    }, true);
    await KnexModule.migrate.latest({
        directory: './src/database/migrations'
    });
};

export const cleanupTestDatabase = async () => {
    await KnexModule.destroy();
};

