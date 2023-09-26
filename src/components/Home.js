import React, { useEffect, useState } from 'react'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import { db } from '../firebase'
import { collection, addDoc, getDocs, onSnapshot, doc,deleteDoc, getDoc, updateDoc } from 'firebase/firestore'
import digi from '../components/digi.jpeg'
const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
 
    const [role, setrole] = useState('')
    const [email, setEmail] = useState('')
  
    const [data, setData] = useState([])
    const [updatedData, setUpdatedData] = useState({})
  
    const [id, setId] = useState('')
    
  
  
    const collectionRef = collection(db, 'crud');
    
    useEffect(() => {
      
      // const fetchData = async () =>{
        //   const fetch  = await getDocs(collectionRef)
        //   setData(fetch.docs.map((doc)=>({
          //     ...doc.data(), id:doc.id
          //   })))
          // }
  
          
          
          const fetchData = async () => {
            onSnapshot(collectionRef, (snapshot) => {
              setData(snapshot.docs.map((doc) => ({
            ...doc.data(), id: doc.id
          })))
        })
      }
      fetchData();
      
      
      setrole(updatedData.role)
      setEmail(updatedData.email)
      
      console.log("useEffect is running");
      
    }, [updatedData])
    
      const handleSubmit = async (e) => {
        e.preventDefault()
  
        if(id===''){
          await addDoc(collectionRef, { role, email })
          console.log("form submitted");
      
          setrole('')
          setEmail('')
  
        }else{
          const updateData = doc(db,'crud',id);
          updateDoc(updateData, {role,email})
          setrole('')
          setEmail('')
          setId("");
        }
    
      }
  
    const handleDelete = (id) =>{
     const deleteData = doc(db,'crud',id);
     deleteDoc(deleteData);
    }
    const handleUpdate = (id) =>{
      setId(id)
     const updateData = doc(db,'crud',id);
      getDoc(updateData).then((doc)=>setUpdatedData(doc.data()));
    }
  
  return (
    <>
      <div className="App p-4 box1 mt-3 text-center">
        <center>
        <h1>Digisailor </h1>
        </center>
        <form onSubmit={handleSubmit}>


          job role :- <input
            onChange={(e) => setrole(e.target.value)}

            value={role}
            type="text"
          />
          <br />
          <br />
          valid email :- <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" />

          <br />
          <br />
          <center><input type="submit" /></center>
        </form>
      </div>

      <div className="App">
        {
          data.map((d) => {
            return (
              <>
                <h5>{d.role}:- {d.email} {" "} 
                <button onClick={()=>handleDelete(d.id)}>Delete</button> {" "} 
                <button onClick={()=>handleUpdate(d.id)}>Update</button> {" "} 
                </h5>
              </>
            )
          })
        }
      </div>
    <div>
    {/* <img src={digi} alt="My Image" /> */}
      <div className="p-4 box1 mt-3 text-center">
       <h4> Welcome to Digisailor</h4> <br />
        Since established in 2013, Digisailor has been offering world-class information technology.
Digisailor is an international IT consulting and Software development 
company with experience in multiple industries, including healthcare, retail,
 manufacturing, banking, and telecoms. Key domains of
  our expertise are IoT, big data, information security, mobile and web development, collaboration and knowledge management, and more. and <h5>please Check your login Email</h5>
        {user && user.email}
      </div>
      </div>
      <div className="d-grid gap-2">
        <Button className='btu1' variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;
