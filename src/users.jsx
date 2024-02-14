import React from 'react'
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from '../src/firebase'
import { useEffect, useState } from 'react';


const Users = () => {
    let [data, setdata] = useState([])
    let datacolliction = collection(db, "users")


    const [name, setname] = useState("")
    const [username, setusername] = useState("")
    const [age, setage] = useState("")
    const [height, setheight] = useState("")
    const [institute, setinstitute] = useState("")
    const [place, setplace] = useState("")

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
      username: username,
      age: age,
      height: height,
      institute: institute,
      place: place
    } );
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
          <span>Username</span>
          <input type="text" value={username} onChange={(e) => setusername(e.target.value)}/>
        </label>
            <br />
        <label>
          <span>Age</span>
          <input type="number" value={age} onChange={(e) => setage(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Height</span>
          <input type="number" value={height} onChange={(e) => setheight(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Institute</span>
          <input type="text" value={institute} onChange={(e) => setinstitute(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Place</span>
          <input type="text" value={place} onChange={(e) => setplace(e.target.value)}/>
        </label>
          <br />
        <button onClick={handleCreate}>Submit</button>

        </div>

        <div>
          {data.map((dat) => {
              return(
                <div className='datas'>
                    <div>
                    <h1>Name: {dat.name}</h1>
                    <h1>Surname: {dat.username}</h1>
                    <h1>Age: {dat.age}</h1>
                    <h1>Height: {dat.height}</h1>
                    <h1>Institut: {dat.institute}</h1>
                    <h1>I m from: {dat.place}</h1>
                    <button onClick={() => handDelete(dat.id)}>Delete</button>
                    </div>
                    <div>
                      <img src={dat.img} alt=""  className='rasm'/>
                    </div>
                </div>
                
              )
          })}
        </div>
    </>
  )
}

export default Users
