import React, { useState, useEffect } from 'react';

const ApiComponent = () => {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    product_id: 0,
    name: '',
    price: 0,
    is_recomment: false,
  });
  const [editableData, setEditableData] = useState({
    product_id: 0,
    name: '',
    price: 0,
    is_recomment: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      const result = await response.json();
      console.log('Inserted data:', result);
      fetchData();
      setNewData({
        product_id: 0,
        name: '',
        price: 0,
        is_recomment: false,
      });
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const updateData = async (id, dataToUpdate) => {
    try {
      const response = await fetch(`http://localhost:3001/data/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToUpdate),
      });
      const result = await response.json();
      console.log('Updated data:', result);
      fetchData();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/data/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      console.log('Deleted data:', result);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleUpdateData = async (e) => {
    e.preventDefault();
    await updateData(editableData.product_id, editableData);
  };

  return (
    <div>
      <form onSubmit={addData}>
        <label>
          Product ID:
          <input
            type="number"
            value={newData.product_id}
            onChange={(e) => setNewData({ ...newData, product_id: parseInt(e.target.value, 10) })}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={newData.name}
            onChange={(e) => setNewData({ ...newData, name: e.target.value })}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={newData.price}
            onChange={(e) => setNewData({ ...newData, price: parseFloat(e.target.value) })}
          />
        </label>
        <label>
          Recomment:
          <input
            type="checkbox"
            checked={newData.is_recomment}
            onChange={(e) => setNewData({ ...newData, is_recomment: e.target.checked })}
          />
        </label>
        <button type="submit">Add Data</button>
      </form>

      <form onSubmit={handleUpdateData}>
        <input
          type="text"
          value={editableData.name}
          onChange={(e) => setEditableData({ ...editableData, name: e.target.value })}
        />
        <input
          type="number"
          value={editableData.price}
          onChange={(e) => setEditableData({ ...editableData, price: parseFloat(e.target.value) })}
        />
        <input
          type="checkbox"
          checked={editableData.is_recomment}
          onChange={(e) => setEditableData({ ...editableData, is_recomment: e.target.checked })}
        />
        <button type="submit">Update Data</button>
      </form>

      <ul>
        {data.map(item => (
          <li key={item.product_id}>
            ID: {item.product_id}   
            Name: {item.name}   
            Price: {item.price}   
            Recomment: {item.is_recomment}
            <button onClick={() => setEditableData(item)}>Edit</button>
            <button onClick={() => deleteData(item.product_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiComponent;
