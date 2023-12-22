import './App.css';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'; // ES6
import React from 'react';
import ApiComponent from './ApiComponent';


const Title =()=><h1> โปรแกรมบัญชีรายรับ - รายจ่าย</h1>
const Description = () =><p> บันทึกข้อมูลบัญชีในแต่ละวัน</p>

const Transaction = ({ title, amount }) => {
  return (
    <ul>
      <li> {title}<span> {amount}</span></li>
    </ul>
  );
};
Transaction.propTypes={
  title:PropTypes.string,
  amount:PropTypes.number
}

function App() {
  const data = [ 
    {title:"ค่ารักษา",amount:2000},
    {title:"ค่ารถ",amount:10},
    {title:"ค่าอาหาร",amount:70},
    {title:"ค่าเน้ต",amount:1500},
  ]
  return ( 
    <div >
      <Title/>
      <Description/>
      
      {data.map((element, index)=>{
        // return <Transaction key={index} title = {element.title} amount = {element.amount}/>
        return <Transaction {...element} key = {uuidv4()}/>
      })}
      <ApiComponent />
    </div>
  );
}

export default App;