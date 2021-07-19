const router =  require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req , res) => {
    Book.find()
    .then( booking => res.json(booking))
    .catch(err => res.status(400).json('Error:'+err));
})

router.route('/').post((req , res) => {
    
    const doctorId = Number(req.body.doctorId);
    const bookingId = Number(req.body.bookingId);
    const name = req.body.name;
    const age = Number(req.body.age);
    const date = Date(req.body.date);
    const phone = Number(req.body.phone); 


    const newBooking = new Book({
        
        doctorId,
        bookingId,
        name,
        age,
        date,
        phone
    });

    newBooking.save()
    .then(() => res.json('Booked!'))
    .catch(err => res.status(400).json('Error:' +err));
});


router.route('/:id').get((req,res) => {
    Book.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err=> res.status(400).json('error :' +err));
});


router.route('/:id').delete((req,res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted.'))
        .catch(err => res.status(400).json('Error:' +err));
});

router.route('/:id').post((req,res) => {
    Book.findById(req.params.id)
    .then(book => {
        
        book.doctorId = Number(req.body.doctorId);
        book.bookingId = Number(req.body.bookingId);
        book.name = req.body.name;
        book.age = Number(req.body.age);
        book.date = Date.parse(req.body.date);
        book.phone = Number(req.body.phone);

        book.save()
            .then(() => res.json('Updated'))
            .catch(err => res.status(400).json('Error:' +err));
    })
    .catch(err => res.status(400).json('Error:' +err));
});

module.exports = router;

