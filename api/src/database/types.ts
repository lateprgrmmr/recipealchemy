// import { ResultProcessingOptions, RetrievalOptions, OrderingOptions, PersistenceInsertOptions } from 'massive';
// import { some } from 'lodash';
// import { log } from '../logger';
// import { Connection } from './connection';

// export class DataError extends Error {
//     constructor(m: string, public httpStatus?: number) {
//         super(m);
//         // Set the prototype explicitly.
//         Object.setPrototypeOf(this, DataError.prototype);
//         if (Error.captureStackTrace) {
//             Error.captureStackTrace(this, DataError);
//         }
//     }
// }

// // Generate a random string of characters
// export function rndId(digits = 4) {
//     var text = '';
//     var possible = 'abcdefghijklmnopqrstuvwxyz';
//     for (var i = 0; i < digits; i++)
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     return text;
// }

// // replace spaces with dash and then remove non-char, non-digit, non-dash
// export function normalizeName(name: string): string {
//     return name.toLowerCase()
//         .replace(/[-\s]+/g, '-') // compress whitespace and dash into dash
//         .replace(/[^a-z\-0-9]/g, '') // remove non alpha-num and dash
//         .replace(/-+/g, '-'); // re-compress conseq dashes into single dash
// }

// export function normalizeNames(names: string[]): string[] {
//     return names.map(v => normalizeName(v));
// }

// export async function transaction<T>(
//     db: Connection,
//     cb: (tx: Connection) => Promise<T>,
//     options?: { tag?: string, mode?: any },
// ): Promise<T> {
//     return db.withTransaction(cb, options);
// }

// export async function connection<T>(
//     db: Connection,
//     cb: (cx: Connection) => Promise<T>,
//     options?: { tag?: string, mode?: any },
// ): Promise<T> {
//     return db.withConnection(cb, options);
// }

// export function hasEmptyArray<T>(criteria: SearchCriteria<T>): boolean {
//     // prevent SQL error in the case of an empty array
//     return some(criteria, (val) => Array.isArray(val) && val.length === 0);
// };

// type NestedSearchCriteria = {
//     or?: Record<string, string | number | number[] | null>[];
//     and?: Record<string, string | number | number[] | null>[];
// };

// type TableSearchCriteria<T> = {
//     [K in keyof T]?: T[K] | T[K][];
// }

// export interface GatherOrderingOptions<T> extends OrderingOptions {
//     field?: Extract<keyof T, string>,
// }

// export interface GatherRetrievalOptions<T> extends RetrievalOptions {
//     fields?: (Extract<keyof T, string>)[]; // TODO: JJT (AKT) need to change the return type to Pick the fields defined here
//     order?: GatherOrderingOptions<T>[];
//     distinct?: boolean;
// }

// export type SearchCriteria<T> = TableSearchCriteria<T> & NestedSearchCriteria;

// type SaveOptions<T> = ResultProcessingOptions & { onConflictUpdate: (keyof T)[] };
// /**
//  * Overriding @types/massive Table type (pulling in extended Queryable too)
//  * version "4.6.2"
//  */
// interface MassiveTableType<T, Insert extends Partial<T>, Update extends Partial<T>> {
//     /** Delete a record or records. */
//     destroy(criteria: SearchCriteria<T>, options?: ResultProcessingOptions): Promise<T[]>;
//     destroy(id: number | string, options?: ResultProcessingOptions): Promise<T | null>;

//     /** Insert a record or records into the table. */
//     insert(data: Insert, options?: PersistenceInsertOptions & ResultProcessingOptions): Promise<T | null>;
//     insert(data: Insert[], options?: PersistenceInsertOptions & ResultProcessingOptions): Promise<T[]>;

//     /**
//      * Update a record.
//      * May be invoked with a complete record (including primary key), or with a criteria object and a map of fields to new values.
//      * Multi-row updates are only possible through the latter usage.
//      */
//     update(criteria: SearchCriteria<T>, fields: Update, options?: ResultProcessingOptions): Promise<T[]>;
//     update(id: number | string, fields: Update, options?: ResultProcessingOptions): Promise<T | null>;

//     /**
//      * Saves an object.
//      * If the object does not include a value for the table's primary key, this will emit an INSERT to create a new record.
//      * if it does contain the primary key it will emit an UPDATE for the existing record.
//      * Either way, the newest available version of the record will be returned.
//      * This is not a true Postgres upsert! If you need the behavior of ON CONFLICT DO UPDATE, you'll need to use db.query or create an SQL script file.
//      */
//     save(object: Partial<T>, options?: SaveOptions<T>): Promise<T>;

//     /**
//      * Find rows matching criteria.
//      *
//      * @param criteria A criteria object or primary key value.
//      */
//     find(criteria?: SearchCriteria<T>, options?: GatherRetrievalOptions<T> & ResultProcessingOptions): Promise<T[]>;

//     /**
//      * Return a single record.
//      *
//      * @param criteria A criteria object or primary key value.
//      */
//     findOne(criteria: SearchCriteria<T> | number | string, options?: ResultProcessingOptions): Promise<T | null>;

//     count(criteria?: SearchCriteria<T>): Promise<string | null>;
// }

// export class GatherView<T, Insert extends Partial<T>, Update extends Partial<T>> {
//     protected table: MassiveTableType<T, Insert, Update>;
//     protected scripts: MassiveTableType<T, Insert, Update> | undefined;
//     protected defaultRetrievalOptions: GatherRetrievalOptions<T> = {};

//     constructor(
//         dbTable: MassiveTableType<T, Insert, Update>,
//         scripts?: MassiveTableType<T, Insert, Update>,
//         defaultRetrievalOptions: GatherRetrievalOptions<T> = {},
//     ) {
//         this.table = dbTable;
//         this.scripts = scripts;
//         this.defaultRetrievalOptions = defaultRetrievalOptions;
//     }
//     public async findOne(criteria: SearchCriteria<T> | number | string): Promise<T | null> {
//         return this.table.findOne(criteria);
//     }
//     public async find(criteria?: SearchCriteria<T>, options?: GatherRetrievalOptions<T> & ResultProcessingOptions): Promise<T[]> {

//         if (criteria && hasEmptyArray<T>(criteria)) {
//             return [];
//         }

//         return this.table.find(criteria, {
//             ...this.defaultRetrievalOptions,
//             ...options,
//         });
//     }

//     public async count(criteria?: SearchCriteria<T>): Promise<string | null> {
//         if (criteria && hasEmptyArray<T>(criteria)) {
//             return '0';
//         }

//         return this.table.count(criteria);
//     }

//     public script<U extends any[]>(scriptName: string): (obj: Record<string, any>) => Promise<U> {
//         if (!this.scripts) {
//             return log.throw('GatherView/Table script() function: scripts location not defined for this Table/View', 500, { scriptName });
//         }
//         if (!this.scripts.hasOwnProperty(scriptName)) {
//             return log.throw(`GatherView/Table script() function: "${scriptName}" script not defined`, 500, { scriptName });
//         }
//         return this.scripts[scriptName];
//     }
// }

// export class GatherTable<
//     T,
//     Insert extends Partial<T> = Partial<T>,
//     Update extends Partial<T> = Partial<T>,
// > extends GatherView<T, Insert, Update> {

//     public async insertOne(object: Insert, options?: PersistenceInsertOptions & ResultProcessingOptions): Promise<T | null> {
//         return this.table.insert(object, options);
//     }

//     public async insert(objects: Insert[], options?: PersistenceInsertOptions & ResultProcessingOptions): Promise<T[]> {
//         if (objects.length === 0) {
//             return [];
//         }
//         return this.table.insert(objects, options);
//     }

//     public async save(object: Insert): Promise<T | null> {
//         return this.table.save(object)
//     }

//     public async updateOne(id: number | string, updates: Update, options?: ResultProcessingOptions): Promise<T | null> {
//         return this.table.update(id, updates, options);
//     }

//     public async update(criteria: SearchCriteria<T>, updates: Update): Promise<T[]> {

//         if (hasEmptyArray<T>(criteria)) {
//             return [];
//         }

//         return this.table.update(criteria, updates);
//     }

//     public async destroyOne(id: number | string): Promise<T | null> {
//         return this.table.destroy(id);
//     }

//     public async destroy(criteria: SearchCriteria<T>): Promise<T[]> {

//         if (hasEmptyArray<T>(criteria)) {
//             return [];
//         }

//         return this.table.destroy(criteria);
//     }
// }

// abstract class CreateAndReadDAO<
//     T extends SearchCriteria<T>,
//     Insert extends Partial<T> = Partial<T>,
// > {

//     protected abstract getTable(db: Connection): Promise<GatherTable<T, Insert>>;

//     // override when needed
//     protected defaultMapper(record: T): T {
//         return record;
//     }

//     protected sanitizeInsertRecord(record: Insert): Insert {
//         return record;
//     }

//     async script<U extends any[]>(db: Connection, scriptName: string, params: Record<string, any>): Promise<U> {
//         const table = await this.getTable(db);

//         const records: U = await table.script<U>(scriptName)(params);
//         return records;
//     }

//     async findById(db: Connection, id: number | string): Promise<T | null> {
//         const table = await this.getTable(db);
//         const record = await table.findOne(id);
//         return record ? this.defaultMapper(record) : null;
//     }

//     async findOneFor(db: Connection, criteria: SearchCriteria<T>): Promise<T | null> {
//         const table = await this.getTable(db);
//         const record = await table.findOne(criteria);
//         return record ? this.defaultMapper(record) : null;
//     }

//     async findAll(db: Connection, options?: GatherRetrievalOptions<T> & ResultProcessingOptions): Promise<T[]> {
//         const table = await this.getTable(db);
//         const records = await table.find(undefined, options);
//         return records.map(this.defaultMapper);
//     }

//     async findAllFor(db: Connection, criteria: SearchCriteria<T>, options?: GatherRetrievalOptions<T> & ResultProcessingOptions): Promise<T[]> {
//         const table = await this.getTable(db);

//         const records = await table.find(criteria, options);
//         return records.map(this.defaultMapper);
//     }

//     async count(db: Connection, criteria?: SearchCriteria<T>): Promise<number> {
//         const table = await this.getTable(db);

//         const count: string | null = await table.count(criteria);
//         const countAsNumber = Number(count);
//         if (Number.isNaN(countAsNumber)) {
//             return log.throw('Massive count returned NaN', 500, { count, countAsNumber, criteria });
//         }
//         return countAsNumber;
//     }

//     async insert(db: Connection, record: Insert, options?: PersistenceInsertOptions): Promise<T | null> {
//         const table = await this.getTable(db);
//         const sanitizedRecord = this.sanitizeInsertRecord(record);
//         const newRecord = await table.insertOne(sanitizedRecord, options);
//         return newRecord ? this.defaultMapper(newRecord) : null;
//     }

//     async batchInsert(db: Connection, records: Insert[]): Promise<T[]> {
//         const sanitizedRecords = records.map((r) => this.sanitizeInsertRecord(r));
//         const table = await this.getTable(db);

//         const newRecords = await table.insert(sanitizedRecords);
//         if (newRecords.length !== sanitizedRecords.length) {
//             log.warn('Number of inserted records does not match requested number to be inserted', { newRecords, sanitizedRecords, records });
//         }
//         return newRecords.map(this.defaultMapper);
//     }

//     async batchInsertWithIds(db: Connection, records: Insert[], options?: PersistenceInsertOptions): Promise<T[]> {
//         const sanitizedRecords = records.map((r) => this.sanitizeInsertRecord(r));
//         const table = await this.getTable(db);

//         const newRecords = await table.insert(sanitizedRecords, options);
//         return newRecords.map(this.defaultMapper);
//     }

//     async save(db: Connection, record: Insert): Promise<T | null> {
//         const table = await this.getTable(db);
//         const sanitizedRecord = this.sanitizeInsertRecord(record);
//         const upsertedRecord = await table.save(sanitizedRecord);
//         return upsertedRecord ?this.defaultMapper(upsertedRecord) : null;
//     }
// }

// export abstract class ImmutableBaseDAO<
//     T extends SearchCriteria<T>,
//     Insert extends Partial<T>,
// > extends CreateAndReadDAO<T, Insert> { }

// export abstract class BaseDAO<
//     T extends SearchCriteria<T>,
//     Insert extends Partial<T> = Partial<T>,
//     Update extends Partial<T> = Partial<T>,
// > extends CreateAndReadDAO<T, Insert> {

//     protected sanitizeUpdateRecord(record: Update): Update {
//         return record;
//     }

//     async updateById(db: Connection, id: number | string, record: Update): Promise<T | null> {
//         const table = await this.getTable(db);

//         const sanitizedRecord = this.sanitizeUpdateRecord(record);

//         const updatedRecord = await table.updateOne(id, sanitizedRecord);
//         return updatedRecord ? this.defaultMapper(updatedRecord) : null;
//     }

//     async update(db: Connection, criteria: SearchCriteria<T>, record: Update): Promise<T[]> {
//         const table = await this.getTable(db);

//         const sanitizedRecord = this.sanitizeUpdateRecord(record);

//         const updatedRecord = await table.update(criteria, sanitizedRecord);
//         return updatedRecord.map(this.defaultMapper);
//     }

//     async removeById(db: Connection, id: number | string): Promise<T | null> {
//         const table = await this.getTable(db);
//         return await table.destroyOne(id);
//     }

//     async removeAllFor(db: Connection, criteria: SearchCriteria<T>): Promise<T[]> {
//         const table = await this.getTable(db);
//         return await table.destroy(criteria);
//     }
// }

// export abstract class BaseDAOWithoutDelete<
//     T extends SearchCriteria<T>,
//     Insert extends Partial<T> = Partial<T>,
//     Update extends Partial<T> = Partial<T>,
// > extends BaseDAO<T, Insert, Update> {

//     /** @deprecated Not Supported */
//     async removeById(db: Connection, id: number | string): Promise<never> {
//         return log.throw('removeById Not Supported', 500);
//     }

//     /** @deprecated Not Supported */
//     async removeAllFor(db: Connection, criteria: SearchCriteria<T>): Promise<never> {
//         return log.throw('removeAllFor Not Supported', 500);
//     }
// }
