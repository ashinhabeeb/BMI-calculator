import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import overweightimg from './assets/OIP-removebg-preview.png';
import Underweightimg from './assets/OIP__1_-removebg-preview.png';
import obeseimg from './assets/preview-removebg-preview.png';
import normal from './assets/normal.png'




function App() {


  const [age, setAge] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmistatus, setbmistatus] = useState(0)
  const [image, getImage] = useState("")
  const [bmi, setBmi] = useState(0)
  const [isAge, setIsAge] = useState(true)
  const[isHeight, setIsHeight] = useState(true)
  const[isWeight, setIsWeight] = useState(true)
 

  const validate = (e)=>{
    console.log(e.target.name)
    console.log(e.target.value);
    if(!!e.target.value.match('^[0-9]*$')){
      if(e.target.name=='age'){
        setAge(e.target.value)
        setIsAge(true)
      }
      if(e.target.name=='height'){
        setHeight(e.target.value)
        setIsHeight(true)
      }
      else if(e.target.name=='weight'){
        setWeight(e.target.value)
        setIsWeight(true)
      }
    }
    else {
      if(e.target.name=='age'){
        setAge(e.target.value)
        setIsAge(false)
      }
      if(e.target.name=='height'){
        setHeight(e.target.value)
        setIsHeight(false)
      }
      else if(e.target.name=='weight'){
        setWeight(e.target.value)
        setIsWeight(false)
      }
    }

  }

  const handlereset =()=>{
    setAge("")
    setHeight("")
    setWeight("")
    setBmi(0)
    getImage("")
    setbmistatus(" None")
    setIsAge(true)
    setIsHeight(true)
    setIsWeight(true)
  }



  const calculate = () => {
    // Convert height from cm to meters and check if height and weight are provided
    if (height && weight) {
      const heightInMeters = height / 100;
      const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(2); // Round to 2 decimal places
      setBmi(calculatedBmi);
      getBMIStatus(calculatedBmi)
    } else {
      alert("Please enter both height and weight.");
    }
  }

  // Function to determine BMI status
  const getBMIStatus = (bmi) => {
    let statuss=''
    let imagepath=''
    if (bmi < 18.5) {
      statuss='Underweight'
      imagepath = Underweightimg
     
    } else if (bmi >= 18.5 && bmi < 24.9) {
      statuss='Normal weight'
      imagepath = normal
    
    } else if (bmi >= 25 && bmi < 29.9) {
       statuss='Overweight'
       imagepath = overweightimg

      
    } else {
      statuss='Obese'
      imagepath = obeseimg

    }
    setbmistatus(statuss)
    getImage(imagepath)
  };
 
  return (
    <>
     <div style={{height:'110vh',width:'100%',backgroundColor:'rgb(230 248 109)'}} className="container rounded-5 my-5 d-flex justify-content-center align-items-center">
      <div style={{width:'600px'}} className='p-5 rounded-4 '>
        <h1>CALCULATE YOUR BMI</h1>
        <hr />

        <div className='d-flex justify-content-center align-items-center mt-5 '>

        <TextField id="filled-basic" name='age' onChange={(e)=>validate(e)} value={age}  label="Age" variant="filled" /> 
        { !isAge && <span className='text-danger' >*Invalid input</span>}

       </div>
       <div className='d-flex justify-content-center align-items-center mt-3 gap-3 '>
        

       <TextField id="filled-basic"  name='height'  onChange={(e)=>validate(e)} value={height} label="Height" variant="filled" /> 
        { !isHeight && <span className='text-danger' >*Invalid input</span>}

        <TextField id="filled-basic"  onChange={(e)=>validate(e)} value={weight} name='weight' label="Weight" variant="filled" />
        { !isWeight && <span className='text-danger' >*Invalid input</span>}
        
       </div>

       <div className='d-flex justify-content-center align-items-center gap-2 mt-5'>
       <Button variant="contained" style={{width:'180px', height:'50px'}} className='bg-dark rounded-0' onClick={calculate}>CALCULATE</Button>
       <Button variant="outlined" style={{width:'180px', height:'50px'}} color='black' className='rounded-0'  onClick={handlereset}  >RESET</Button>
       </div>

       <div className='d-flex justify-content-center align-items-center rounded-0 p-5 flex-column'>
        <h5>YOUR BMI IS : {bmi} </h5>
        <h5>STATUS :{bmistatus}</h5>
        <img src={image} alt="" style={{width:'150px'}} />
       </div>
    
      </div>
     </div>
    </>
  )
}

export default App






