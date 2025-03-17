// api.js

const BASE_URL = 'http://192.168.204.240:5000/api/diary'; // Update with your actual server URL

export const addDiaryRecord = async (record) => {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding diary record:', error);
    throw error;
  }
};

export const listDiaryRecords = async () => {
  try {
    const response = await fetch(`${BASE_URL}/list`);
    return await response.json();
  } catch (error) {
    console.error('Error listing diary records:', error);
    throw error;
  }
};

export const deleteDiaryRecord = async (id) => {
  try {
    console.log(id)
    // const response = await fetch(`${BASE_URL}/delete`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ id }),
    // });
    return await response.json();
  } catch (error) {
    console.error('Error deleting diary record:', error);
    throw error;
  }
};

export const getDiaryRecord = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error getting diary record:', error);
    throw error;
  }
};
