const router =  require('express').Router();
let Booking = require('../models/book.model');

router.route('/').get((req , res) => {
    Booking.find()
    .then( booking => res.json(booking))
    .catch(err => res.status(400).json('Error:'+err));
})

router.route('/').post((req , res) => {
    const bookingId = Number(req.body.bookingId);
    const doctorId = Number(req.body.doctorId);
    const name = req.body.name;
    const age = Number(req.body.age);
    const date = Date(req.body.date);
    const phone = Number(req.body.phone); 


    const newBooking = new Booking({
        bookingId,
        doctorId,
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
    Booking.findById(req.params.id)
        .then(book => res.json(book))
        .catch(err=> res.status(400).json('error :' +err));
});


router.route('/:id').delete((req,res) => {
    Booking.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted.'))
        .catch(err => res.status(400).json('Error:' +err));
});

router.route('/:id').post((req,res) => {
    Booking.findById(req.params.id)
    .then(book => {
        book.bookingId = Number(req.body.bookingId);
        book.doctorId = Number(req.body.DoctorId);
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

