import Datastore from 'nedb';

import Downloader from './downloader';
import Logger from './logger';
import ListReporter from './reporter/list';
import SearchReporter from './reporter/search';
import Store from './store';

const db = createDatabase();
const env = process.env.NODE_ENV;
const downloadDirectory = process.env.DOWNLOAD_DIRECTORY;

function createDatabase() {
    const db = new Datastore({
        autoload: true,
        timestampData: true,
        filename: process.env.DB_FILENAME
    });

    db.ensureIndex({ fieldName: 'url',  unique: true });
    db.ensureIndex({ fieldName: 'name', unique: true });

    return db;
}


const store = new Store({ db });
const logger = new Logger({ env });

export function getStore() {
    return store;
}

export function getLogger() {
    return logger;
}

export function getDownloader(podcast) {
    return new Downloader(podcast, { directory: downloadDirectory });
}

export function getListReporter(options) {
    options = Object.assign({ logger }, options);
    return new ListReporter(options);
}

export function getSearchReporter(options) {
    options = Object.assign({ logger }, options);
    return new SearchReporter(options);
}
