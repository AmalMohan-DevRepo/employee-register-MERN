const express = require('express')
const router = express.Router()

const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController')

router.route('/').get(getEmployees).post(createEmployee)

router.route('/:id').put(updateEmployee).delete(deleteEmployee)

module.exports = router