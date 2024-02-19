
import './App.css'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, updateDoc, } from "firebase/firestore";
import { db } from '../src/firebase'
import { useEffect, useState } from 'react';


function App() {
  let [data, setdata] = useState([])
  let datacolliction = collection(db, "products")

  const [title, settitle] = useState("")
  const [model, setmodel] = useState("")
  const [narxi, setnarxi] = useState("")
  const [yili, setyili] = useState("")
  const [hotirasi, sethotirasi] = useState("")
  const [duym, setduym] = useState("")
  const [joyi, setjoyi] = useState("")
  const [id, setid] = useState("")
  const [show, setshow] = useState(false)


  useEffect(() =>{
    // const getData = async () => {
    //   const dbValue = await getDocs(datacolliction);
    //   setdata(dbValue.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };
    // getData();

    onSnapshot(datacolliction, (snapshot) => {
      const datalist = [];
      snapshot.docs.forEach((doc) => {
        datalist.push({id: doc.id, ...doc.data()});
      });
      setdata(datalist);
    }),
      (error) => {
        console.log(error);
      }

      

  }, []);

  console.log(data);


  const handleCreate = async () =>{
    await addDoc(datacolliction, {Title: title, Name: model, Narxi: narxi, Yili:yili, Hotirasi: hotirasi, Ekran: duym, Joyi: joyi})
    // window.location.reload();
    settitle('')
    setmodel('')
    setnarxi('')
    setyili('')
    sethotirasi('')
    setduym('')
    setjoyi('')
  }
  
  
  const handDelete = async (id) => {
    await deleteDoc(doc(datacolliction, id))
    // window.location.reload();
  }

  const handleEdit = async (id, Title, Name, Ekran, Hotirasi, Yili, Narxi, Joyi) =>{
    settitle(Title)
    setmodel(Name)
    setduym(Ekran)
    sethotirasi(Hotirasi)
    setyili(Yili)
    setnarxi(Narxi)
    setjoyi(Joyi)
    setid(id)
    setshow(true)
    // window.location.reload()

  }

  const handleUpdate= async () =>{
    const updatedata = doc(db, "products", id);
    await updateDoc(updatedata, {Title: title, Name: model, Narxi: narxi, Yili:yili, Hotirasi: hotirasi, Ekran: duym, Joyi: joyi})
    settitle('')
    setmodel('')
    setnarxi('')
    setyili('')
    sethotirasi('')
    setduym('')
    setjoyi('')
    setshow(false)
  }

  return (
    <> 
          <h2>FireBase Data</h2>

        <div className='forms'>
        <label>
          <span>Title</span>
          <input type="text" value={title} onChange={(e) => settitle(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Model</span>
          <input type="text" value={model} onChange={(e) => setmodel(e.target.value)}/>
        </label>
            <br />
        <label>
          <span>Narxi</span>
          <input type="number" value={narxi} onChange={(e) => setnarxi(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Yili</span>
          <input type="number" value={yili} onChange={(e) => setyili(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Hotirasi</span>
          <input type="number" value={hotirasi} onChange={(e) => sethotirasi(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Ekran duym</span>
          <input type="number" value={duym} onChange={(e) => setduym(e.target.value)}/>
        </label>
          <br />
        <label>
          <span>Madi in</span>
          <input type="text" value={joyi} onChange={(e) => setjoyi(e.target.value)}/>
        </label>
          <br />
          
          {
            !show ?  (
              <button onClick={handleCreate}>Submit</button>     
            ) : (
              <button onClick={handleUpdate}>Update</button>       
            )
          }

        </div>


        <div>
          {data.map((dat) => {
            return(
              <div className='datas' key={dat.title}>
                  <div>
                  <h1>Title {dat.Title}</h1>
                  <h1>Model {dat.Name}</h1>
                  <h1>Ekran duym {dat.Ekran}</h1>
                  <h1>Hotirasi {dat.Hotirasi}</h1>
                  <h1>Yili {dat.Yili}</h1>
                  <h1>Narxi {dat.Narxi}</h1>
                  <h1>Madi in {dat.Joyi}</h1>
                  <button onClick={() => handDelete(dat.id)}>Delete</button>
                  <button onClick={() => handleEdit(dat.id, dat.Title, dat.Name, dat.Ekran, dat.Hotirasi, dat.Yili, dat.Narxi, dat.Joyi)}>Edit</button>
                  </div>
                  <div>
                  <img src={dat.Rasmi} alt="" className='rasm'/>
                  </div>
                </div>
              )
          })}
        </div>
        
    </>
  )
}

export default App


