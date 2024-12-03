const db = require("../../../database/databaseconfig");

const GetCredencial = async (loginPar) => {
    return (
        await db.query(
            "select username_usuario, password_usuario " +
            "from usuarios where username_usuario = $1 and removido_usuario = false",
            [loginPar]
        )
    ).rows;
};

module.exports = {
    GetCredencial,
};