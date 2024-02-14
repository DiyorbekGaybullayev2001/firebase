import React from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from '../src/firebase'
import { useEffect, useState } from 'react';

const Pants = () => {
    let [data, setdata] = useState([])
    let datacolliction = collection(db, "pants")

    const [gender, setgender] = useState("")
    const [style, setstyle] = useState("")
    const [color, setcolor] = useState("")
    const [size, setsize] = useState("")
    const [price, setprice] = useState("")

  useEffect(() =>{
    const getData = async () => {
      const dbValue = await getDocs(datacolliction);
      setdata(dbValue.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  console.log(data);

  const handleCreate = async () => {
    await addDoc(datacolliction, {
      gender: gender,
      style: style,
      color: color,
      size: size,
      price: price
    });
    window.location.reload();
  }

  const handDelete = async (id) => {
    await deleteDoc(doc(datacolliction, id))
    window.location.reload();
  }


  return (
    <>
        <div className='forms'>
        <label>
          <span>Male : Girl </span>
          <input type="text" value={gender} onChange={(e) => setgender(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Style</span>
          <input type="text" value={style} onChange={(e) => setstyle(e.target.value)}/>
        </label>
            <br />
        <label>
          <span>Color</span>
          <input type="text" value={color} onChange={(e) => setcolor(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Size</span>
          <input type="number" value={size} onChange={(e) => setsize(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Price</span>
          <input type="number" value={price} onChange={(e) => setprice(e.target.value)}/>
        </label>
          <br />
        
        <button onClick={handleCreate}>Submit</button>

        </div>

        <div>
          {data.map((dat) => {
              return(
                <div className='datas'>
                  <div>
                    <h1>{dat.gender}</h1>
                    <h1>Style: {dat.style}</h1>
                    <h1>Color: {dat.color}</h1>
                    <h1>Size: {dat.size}</h1>
                    <h1>Price: {dat.price}</h1>
                    <button onClick={() => handDelete(dat.id)}>Delete</button>
                  </div>
                  <div>
                  <img src={dat.img} alt="" className='rasm'/>
                  </div>
                </div>
              )
          })}
        </div>
    </>
  )
}

export default Pants
