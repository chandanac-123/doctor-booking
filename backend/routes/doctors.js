const router =  require('express').Router();
let Doctor = require('../models/doctor.model');


router.route('/').get((req , res) => {
    Doctor.find()
    .then( doctors => res.json(doctors))
    .catch(err => res.status(400).json('Error:'+err));
});

router.route('/').post((req , res) => {
    const doctorId = Number(req.body.doctorId);
    const doctorName = req.body.doctorName;
    const department = req.body.department;

    const newDoctor = new Doctor({
        doctorId,
        doctorName,
        department
    });

    newDoctor.save()
    .then(() => res.json('Doctor added!'))
    .catch(err => res.status(400).json('Error:' +err));
});

router.route('/:id').get((req , res) => {
    Doctor.findById(req.params.id)
    .then( doctors => res.json(doctors))
    .catch(err => res.status(400).json('Error:'+err));
});


router.route('/:id').delete((req,res) => {
    Doctor.findByIdAndDelete(req.params.id)
        .then(() => res.json('Deleted Successfully'))
        .catch(err => res.status(400).json('Error:' +err));
});

router.route('/:id').post((req,res) => {
    Doctor.findByIdAndUpdate(req.params.id)
    .then(doctor => {
       doctor.doctorId = Number(req.body.doctorId);
        doctor.doctorName = req.body.doctorName;
        doctor.department = req.body.department;

        doctor.save()
            .then(() => res.json('Updated'))
            .catch(err => res.status(400).json('Error:' +err));
    })
    .catch(err => res.status(400).json('Error:' +err));
});


module.exports = router;