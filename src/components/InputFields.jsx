


const InputFields = ({label,name,error,colors,type,...inputforms}) => {
 
  // let errorDisplay =() =>{
  //   if(error){
  //     return <p style= {{color:"red"}}>{error}</p>
  //   }
  // }

  return (
    <div className="input-container">

        <label  htmlFor={name}>{label} </label>
        <input className={inputforms.className} placeholder={inputforms.placeholder}
         name={name}  type={type} {...inputforms} />
        {error && <p style={{ color: {colors} }}>{error}</p>}
        </div>
  )
}

export default InputFields
