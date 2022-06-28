const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

//TODO: 
// Get all customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
})

// Get one customer
router.get('/:id', getCustomer, (req, res) => {
    res.send(res.customer.name);
})

// Creating one customer
router.post('/', async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        services: req.body.services,
        date: req.body.date
    })
    try {
        const newCustomer = await customer.save();
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// Modifying one customer
// Using patch, as we will be able to update only the specific info that the user passes in
// If put is used, then we will update all parameters
router.patch('/:id', getCustomer, async (req, res) => {
    if (req.body.name != null) {
        res.customer.name = req.body.name;
    }
    if (req.body.services != null) {
        res.customer.services = req.body.services;
    }
    if (req.body.date != null) {
        res.customer.date = req.body.date;
    }

    try {
        const modifiedCustomer = await res.customer.save();
        res.json(modifiedCustomer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// Deleting one customer
router.delete('/:id', getCustomer, async (req, res) => {
    try {
        await res.customer.remove();
        res.json({ message: 'Customer successfully deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// getCustomer middleware
async function getCustomer(req, res, next) {
    let customer;
    try {
        customer = await Customer.findById(req.params.id);
        if (customer == null) {
            return res.status(404).json({ message: 'Cannot find customer' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.customer = customer;
    next();
}

module.exports = router;