import { useState } from 'react'
import Header from './Header'
import Form from './Form'



const Register = () => {

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    jobType: '',
    email: '',
    dob: '',
    preferredLocation: 'Chennai'
  })

  return (
    <>
      <Header link='View Emloyee List' to='/employees' />
      <div className='container-fluid mt-5'>
        <Form isRegister={true} formData={formData} setFormData={setFormData} />
      </div>
    </>
  )
}

export default Register