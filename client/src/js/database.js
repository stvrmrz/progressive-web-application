import { openDB } from 'idb';

const initdb = async () => {
  // Create a new database named 'jate' with version 1
  openDB('jate', 1, {
    // Add our database schema if it hasn't been created yet
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Method to accept content and add it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open a connection to the 'jate' database
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Use the .put() method to add or update the content in the store
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Method to get all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Open a connection to the 'jate' database
  const jateDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  // Open up the desired object store
  const store = tx.objectStore('jate');

  // Use the .get() method to get the data from the store
  const request = store.get(1);

  // Get confirmation of the request
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  
  // Return the result
  return result?.value;
};

// Start the database
initdb();
