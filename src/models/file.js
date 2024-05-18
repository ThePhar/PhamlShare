import sqlite3 from "sqlite3";

// TODO: Configure using env instead of hard-coding.
const database = new sqlite3.Database(":memory:");

database.serialize(() => {
    // TODO: Remove debug entries for testing.
    database.run("CREATE TABLE [IF NOT EXISTS] files (id integer primary key, filename)");
    database.run("INSERT INTO files (filename) VALUES (?)", "pharYAML.yaml");
    database.run("INSERT INTO files (filename) VALUES (?)", "test.yaml");
    database.run("INSERT INTO files (filename) VALUES (?)", "sm64.yaml");
});

export default class File {
    constructor(id, filename) {
        this.id = id;
        this.filename = filename;
    }

    /**
     * Returns all files from the database.
     * @param callback {() => void} Called after files are returned.
     */
    static all(callback) {
        database.all("SELECT * FROM files", callback);
    }

    /**
     * Adds a new file to the database.
     * @param file {File} The file to add to the database.
     */
    static add(file) {
        database.run("INSERT INTO files (filename) VALUES (?)", file.filename);
    }

    /**
     * Updates a given file in the database with new data.
     * @param file {File} The updated file to override the existing file in the database.
     * @param callback {() => void} Called after file is updated.
     */
    static update(file, callback) {
        database.run("UPDATE files SET title = ? WHERE id = ?", file.filename, file.id, callback);
    }

    /**
     * Deletes a given file id from the database.
     * @param id {number} The id of the file in the database.
     * @param callback {() => void} Called after file is updated.
     */
    static delete(id, callback) {
        database.run("DELETE FROM files WHERE id = ?", id, callback);
    }
}
