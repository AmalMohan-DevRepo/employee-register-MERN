
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'




const Form = ({ isRegister, data, setModalIsOpen, formData, setFormData, employees, setEmployees }) => {

    const { fullName, mobile, jobType, email, dob, preferredLocation } = formData

    const handleFormInputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }



    const handleReset = () => {

        setFormData({
            fullName: '',
            mobile: '',
            jobType: '',
            email: '',
            dob: '',
            preferredLocation: 'Chennai'

        })


    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const API_URL = '/api/v1/employees/'

        if (isRegister) {


            const response = await axios.post(API_URL, formData)

            if (response.status === 200) {
                toast.success('User Added Successfully')
                navigate('/employees')
            }

            if (response.status === 400) {
                toast.error('User Registration Failed')
                handleReset()
            }


            console.log(response);
        }
        else {
            const response = await axios.put(API_URL + data._id, formData)

            if (response.status === 200) {
                toast.success('User updated Successfully')

                const index = employees.findIndex(employee => employee._id === data._id)
                employees[index] = { ...employees[index], ...formData }
                //console.log(`employees : ${employees}`)
                //const newArr = employees.filter(employee => employee._id!== data._id)
                setModalIsOpen(false)
                setEmployees([...employees])


            }

            if (response.status === 400) {
                toast.error('User update Failed')
                handleReset()
            }


        }

    }


    return (
        <form onSubmit={handleSubmit}>
            <div className='border row'>
                <div className="col p-4">
                    <div className="mb-3 row">
                        <label htmlFor="full-name" className="col-sm-3 col-form-label">Fullname</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="full-name" placeholder='Enter full name' name='fullName'
                                value={fullName}
                                onChange={handleFormInputChange} />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="mobile" className="col-sm-3 col-form-label">Mobile</label>
                        <div className="col-sm-9">
                            <input type="number" className="form-control" id="mobile" placeholder='Enter mobile'
                                name='mobile'
                                value={mobile}
                                onChange={handleFormInputChange}
                            />

                        </div>
                    </div>

                    <div className="mb-3 ">
                        <label className="col-sm-3 col-form-label">Job Type</label>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="jobType" id="job-type-ft" value="FT"
                                checked={jobType === 'FT'}
                                onChange={handleFormInputChange}
                            />
                            <label className="form-check-label" htmlFor="job-type-ft">FT</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="jobType" id="job-type-pt" value="PT"
                                checked={jobType === 'PT'}
                                onChange={handleFormInputChange} />
                            <label className="form-check-label" htmlFor="job-type-pt">PT</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="jobType" id="job-type-consultant" value="Consultant"
                                checked={jobType === 'Consultant'}
                                onChange={handleFormInputChange} />
                            <label className="form-check-label" htmlFor="job-type-consultant">Consultant</label>
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label className="col-sm-3 col-form-label">Pref.&nbsp;Location</label>
                        <select className="col form-select" aria-label="preferred location select" name="preferredLocation" value={preferredLocation}
                            onChange={handleFormInputChange}
                        >
                            <option value="Chennai">Chennai</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Pune">Pune</option>
                        </select>
                    </div>


                </div>



                <div className="col p-4">
                    <div className="mb-3 row">
                        <label htmlFor="profile-Pic" className="col-sm-3 col-form-label">Profile Pic</label>
                        <div className="col-sm-9">
                            <input type="file" id="profile-Pic" />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                            <input type="email" className="form-control" id="email" placeholder='Enter email' name="email" value={email}
                                onChange={handleFormInputChange}
                            />
                        </div>
                    </div>

                    <div className="mb-3 row">
                        <label htmlFor="dob" className="col-sm-3 col-form-label">DOB</label>
                        <div className="col-sm-9">
                            <input type="date" className="form-control" id="dob"
                                name="dob" value={dob}
                                onChange={handleFormInputChange}
                            />
                        </div>
                    </div>


                </div>

            </div>
            <div className='d-flex align-items-center justify-content-evenly mt-5'>

                <button type='submit' className='btn btn-success btn-lg btn-width' >{
                    isRegister ? 'Submit' : 'Update'
                }</button>

                <button type='button' className=' btn btn-danger btn-lg btn-width' onClick={
                    isRegister ? handleReset : () => {
                        setModalIsOpen(false)

                    }
                }>{isRegister ? 'Reset' : 'Cancel'}</button>
            </div>
        </form>
    )
}

export default Form