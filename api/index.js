const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // หรือใด ๆ ที่คุณต้องการ
app.use(cors());
app.options('*', cors());

// เพิ่มเชื่อมต่อกับ PostgreSQL
const pgp = require('pg-promise')();
const db = pgp('postgres://postgres:20250@localhost:5432/test'); // แทนที่ username, password, database_name ตามของคุณ


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// เพิ่มข้อมูล
app.post('/data', async (req, res) => {
try {
    const {product_id, name, price, is_recomment } = req.body; // รับข้อมูลจาก body
    const insertQuery = 'INSERT INTO product (product_id, name, price, is_recomment) VALUES ($1, $2, $3, $4) RETURNING *';
    const insertedData = await db.one(insertQuery, [product_id, name, price, is_recomment]);
    res.json(insertedData);
} catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

// อัปเดตข้อมูล
app.put('/data/:id', async (req, res) => {
try {
    const id = req.params.id;
    const { name, price, is_recomment } = req.body;
    const updateQuery = 'UPDATE product SET name=$1, price=$2, is_recomment=$3 WHERE product_id=$4 RETURNING *';
    const updatedData = await db.one(updateQuery, [name, price, is_recomment, id]);
    res.json(updatedData);
} catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

// ลบข้อมูล
app.delete('/data/:id', async (req, res) => {
try {
    const id = req.params.id;
    const deleteQuery = 'DELETE FROM product WHERE product_id=$1 RETURNING *';
    const deletedData = await db.one(deleteQuery, [id]);
    res.json(deletedData);
} catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});
  
  
  

// ตัวอย่าง endpoint สำหรับดึงข้อมูล
app.get('/data', async (req, res) => {
  try {
    const data = await db.any('SELECT * FROM product'); // แทนที่ your_table_name ตามของคุณ
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
