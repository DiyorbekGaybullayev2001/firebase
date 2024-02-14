import React from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from '../src/firebase'
import { useEffect, useState } from 'react';

const Books = () => {
    let [data, setdata] = useState([])
  let datacolliction = collection(db, "books")

  const [name, setname] = useState("")
  const [autor, setautor] = useState("")
  const [about, setabout] = useState("")
  const [copy, setcopy] = useState("")
  const [luange, setluange] = useState("")
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
      name: name,
      autor: autor,
      about: about,
      copy: copy,
      luange: luange,
      price: price
    });
    window.location.reload();
  }


  const handDelete = async (id) => {
    await deleteDoc(doc(datacolliction, id));
    window.location.reload();
  }

  return (
    <> 

<div className='forms'>
        <label>
          <span>Name</span>
          <input type="text" value={name} onChange={(e) => setname(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Author</span>
          <input type="text" value={autor} onChange={(e) => setautor(e.target.value)}/>
        </label>
            <br />
        <label>
          <span>About</span>
          <input type="text" value={about} onChange={(e) => setabout(e.target.value)}/>
        </label>
            <br />
        <label>
          <span>Copy</span>
          <input type="number" value={copy} onChange={(e) => setcopy(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Luange</span>
          <input type="text" value={luange} onChange={(e) => setluange(e.target.value)}/>
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
                    <h1>Kitob Nomi: {dat.name}</h1>
                    <h1>Muallifi: {dat.autor}</h1>
                    <h1>{dat.about} -kitob</h1>
                    <h1>Nusxa: {dat.copy}</h1>
                    <h1>Til: {dat.luange}</h1>
                    <h1>Narxi: {dat.price}</h1>
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

export default Books
