import { Version } from "../../types/version";

const DB_NAME = "DataManagementDB";
const DB_VERSION = 1;
const STORE_NAME = "versions";

let dbInstance: IDBDatabase | null = null;

const openDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        if (dbInstance) {
            return resolve(dbInstance);
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "version" });
            }
        };

        request.onsuccess = (event) => {
            dbInstance = (event.target as IDBOpenDBRequest).result;
            resolve(dbInstance);
        };

        request.onerror = (event) => {
            console.error("IndexedDB error:", (event.target as IDBOpenDBRequest).error);
            reject((event.target as IDBOpenDBRequest).error);
        };
    });
};


const getVersionsFromIndexedDB = async (): Promise<Version[]> => {
    try {
        const db = await openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    } catch (error) {
        console.error("Error getting versions from IndexedDB:", error);
        return [];
    }
};

const saveVersionToIndexedDB = async (version: Version): Promise<void> => {
    if (!version.version) {
        throw new Error("Version key is missing");
    }

    try {
        const db = await openDatabase();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            const putRequest = store.put(version);

            putRequest.onsuccess = () => resolve();
            putRequest.onerror = () => reject(putRequest.error || new Error("Failed to save data in IndexedDB"));
        });
    } catch (error) {
        console.error("Error saving version to IndexedDB:", error);
    }
};

const initialFetchData = async (): Promise<any[]> => {
    try {
        const res = await fetch("../db.json"); 
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        await saveVersionToIndexedDB({ version: 1, data });
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

export { getVersionsFromIndexedDB, saveVersionToIndexedDB, initialFetchData };
