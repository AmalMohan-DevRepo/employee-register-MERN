
import Header from './Header'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Employee from './Employee'



const Employees = () => {

    const [employees, setEmployees] = useState([])


    useEffect(() => {

        const fetchData = async () => {
            const API_URL = '/api/v1/employees/'
            const response = await axios.get(API_URL)
            console.log(response.data)

            setEmployees(response.data.employees)
        }

        fetchData()



    }, [])

    console.log(employees)
    return (
        <>
            <Header link='Register New Employee' to='/' />
            <div className='container-fluit mt-4'>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {
                        employees.map(employee =>
                            <Employee key={employee._id} data={employee} setEmployees={setEmployees} employees={employees} />
                        )}

                </div>
            </div>
        </>
    )
}

export default Employees