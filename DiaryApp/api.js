export const addDiaryRecord = async (record, BACKEND_URL) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/diary/add`, {
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

export const listDiaryRecords = async (BACKEND_URL) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/diary/list`)
    const res = await response.json()
    return res;
  } catch (error) {
    console.error('Error listing diary records:', error);
  }
};

export const deleteDiaryRecord = async (id, BACKEND_URL) => {
  try {
    console.log(id)
    // const response = await fetch(`${BACKEND_URL}/delete`, {
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

export const getDiaryRecord = async (id, BACKEND_URL) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/diary/get`, {
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
