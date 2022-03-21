import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { MdAlternateEmail, MdOutlineEdit } from 'react-icons/md'
import { ImMobile } from 'react-icons/im'
import { GoCalendar, GoLocation, GoTrashcan } from 'react-icons/go'
import { BsLaptop } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-toastify'
import Modal from 'react-modal'
import Form from './Form'

Modal.setAppElement('#root')

const Employee = ({ data, setEmployees, employees }) => {

    const [formData, setFormData] = useState({
        fullName: '',
        mobile: '',
        jobType: '',
        email: '',
        dob: '',
        preferredLocation: 'Chennai'
    })

    const { fullName, mobile, jobType, preferredLocation, dob, email } = data
    const handleDelete = async () => {
        const API_URL = `/api/v1/employees/${data._id}`
        const response = await axios.delete(API_URL)

        if (response.status === 200) {
            const newEmpArr = employees.filter(employee => employee._id !== data._id)
            setEmployees(newEmpArr)
            toast.error('Employee Record Removed')
        }
    }

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const handleEdit = () => {
        setModalIsOpen(true)
        setFormData({
            fullName: data.fullName,
            mobile: data.mobile,
            jobType: data.jobType,
            email: data.email,
            dob: new Date(data.dob).toISOString().slice(0, 10),
            preferredLocation: data.preferredLocation

        })
    }

    return (
        <>
            <div className="col">
                <div className="card h-100">
                    <div className="card-img-top w-100 d-flex justify-content-center align-items center mt-2"><FaUserCircle /></div>
                    <div className="card-body">
                        <h5 className="card-title">{fullName}</h5>
                        <p className="card-text"><MdAlternateEmail /> : {email}</p>
                        <p className="card-text"><ImMobile /> : {mobile}</p>
                        <p className="card-text"><GoCalendar /> : {new Date(dob).toLocaleDateString()}</p>
                        <p className="card-text"><BsLaptop /> : {jobType}</p>
                        <p className="card-text"><GoLocation /> : {preferredLocation}</p>
                    </div>
                    <div className='card-footer'>
                        <button className='btn btn-outline-dark w-100' onClick={handleEdit}> <MdOutlineEdit /> Edit </button>
                        <button className='btn btn-outline-dark w-100 mt-2' onClick={handleDelete}><GoTrashcan /> Delete </button>

                    </div>
                </div>
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={() => { setModalIsOpen(false) }} >
                <Form data={data} isRegister={false} setModalIsOpen={setModalIsOpen} formData={formData} setFormData={setFormData} employees={employees}
                    setEmployees={setEmployees} />
            </Modal>
        </>
    )
}

export default Employee