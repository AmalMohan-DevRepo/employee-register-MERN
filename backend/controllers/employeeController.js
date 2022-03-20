const asyncHandler = require('express-async-handler')

const Employee = require('../models/employeeModel')



//@desc     Get Employees
//@route    GET /api/v1/employees
//@access   Public

const getEmployees = asyncHandler(async (req, res) => {

    const employees = await Employee.find()

    res.status(200).json({
        employees
    })
})

//@desc     Create Employee
//@route    POST /api/v1/employees
//@access   Public

const createEmployee = asyncHandler(async (req, res) => {

    const { fullName, email, dob, mobile, jobType, preferredLocation } = req.body

    // check for any invalid/missing form fields

    if (!fullName) {
        res.status(400)
        throw new Error('Employee name required')
    }

    if (!email) {
        res.status(400)
        throw new Error('Employee email required')
    }

    if (!dob) {
        res.status(400)
        throw new Error('DOB required')
    }

    if (!mobile) {
        res.status(400)
        throw new Error('Mobile number required')
    }

    if (!jobType) {
        res.status(400)
        throw new Error('Job type required')
    }

    if (!preferredLocation) {
        res.status(400)
        throw new Error('Preferred location required')
    }

    // I will not allow registration with same email or mobile number again
    const employeeExists = await Employee.findOne({ email }) || await Employee.findOne({ mobile })

    if (employeeExists) {
        res.status(400)
        throw new Error('Employee record already exists')
    }



    const employee = await Employee.create({
        fullName,
        mobile,
        jobType,
        email,
        dob,
        preferredLocation
    })

    res.status(200).json({
        employee
    })
})

//@desc     Update Employee
//@route    PUT /api/v1/employees/:id
//@access   Public


const updateEmployee = asyncHandler(async (req, res) => {

    const employee = await Employee.findById(req.params.id)
    const { email, mobile } = req.body

    if (!employee) {
        res.status(400)
        throw new Error('Unable to update, Employee record not found!')
    }

    // I will not allow to update same email or mobile number again
    const empWithSameEmail = await Employee.find({ email })
    const empWithSameMobile = await Employee.find({ mobile })

    //I'm expecting only one record for an email or mobile, so the above query should always return an array with a single object
    //I need to check if the updated email or mobile does not belong to another user
    if ((empWithSameEmail.length !== 0 && empWithSameEmail[0]._id.toString() !== req.params.id) || (empWithSameMobile.length !== 0 && empWithSameMobile[0]._id.toString() !== req.params.id)) {
        res.status(400)
        throw new Error('Unable to update, mobile or email already exists')
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json({
        updatedEmployee
    })
})

//@desc     Delete Employee
//@route    Delete /api/v1/employees/:id
//@access   Public

const deleteEmployee = asyncHandler(async (req, res) => {

    const employee = await Employee.findById(req.params.id)
    console.log(employee)

    if (!employee) {
        res.status(400)
        throw new Error('Unable to delete, Employee record not found!')
    }

    await Employee.deleteOne()

    res.status(200).json({
        message: `Deleted record of the employee, ${employee.fullName} with id,  ${employee._id}`
    })
})

module.exports = { getEmployees, createEmployee, updateEmployee, deleteEmployee }