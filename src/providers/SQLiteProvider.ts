import { Database, open } from "sqlite";
import { RowData } from "../interfaces/RowData";

interface SQLiteProviderOptions {
	table: string | 'vultrexdb';
	fileName: string | 'vultrexdb';
}

export default class SQLiteProvider {
	private db: Database;
	public table: string;
	public fileName: string;
	public initialized: boolean = false;
	public constructor(config: SQLiteProviderOptions) {
		this.table = config.table;
		this.fileName = config.fileName;
	}

	public async init() {
		this.db = await open(`./${this.fileName}.db`);
		await this.db.run(`CREATE TABLE IF NOT EXISTS '${this.table}' (key TEXT PRIMARY KEY, value TEXT);`);
		this.initialized = true;
	}

	public async set(key: string | number, value: any) {
		this.db.run(`INSERT OR REPLACE INTO '${this.table}' (key, value) VALUES(?, ?);`, key, JSON.stringify(value));
	}

	public async get<T>(key: string | number, defaultValue: any): Promise<T> {
		const data = await this.db.get(`SELECT * FROM '${this.table}' WHERE key = ?;`, key);
		return data ? JSON.parse(data["value"]) : defaultValue;
	}

	public async getAll(key: string | number): Promise<RowData[]> {
		const query = key ? `SELECT * FROM '${this.table}' WHERE key LIKE '%${key}%';` : `SELECT * FROM '${this.table}';`;
		const data = await this.db.all(query);
		return data.map((data: any) => ({ key: data["key"], value: JSON.parse(data["value"]) }));
	}

	public async size(): Promise<any> {
		const data = await this.db.get(`SELECT count(*) FROM '${this.table}';`);
		return data["count(*)"];
	}

	public async delete(key: string | number): Promise<void> {
		this.db.run(`DELETE FROM '${this.table}' WHERE key = ?;`, key);
	}

	public async clear(): Promise<void> {
		this.db.run(`DELETE FROM '${this.table}';`);
	}
}