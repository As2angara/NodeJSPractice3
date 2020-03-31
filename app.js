const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {
    const course  = new Course({
        name: 'Angular Course',
        author: 'Adrian Angara',
        tags: [ 'angular', 'frontend' ],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

//List of comparison operators
//eq (equal)
//ne (not equal)
//gt (greater than)
//gte (greater than or equal)
//lt (less than)
//lte (less than or equal)
//in
//nin (not in)
    //ex: .find({ price: { $gte: 10, $lte: 20 } })
    //Find price, p that is  10 <= p , and p <= 20
    //ex: .find({ price: { $in: [ 10, 20, 30 ] } });
    //Find price that corresponds the an item in the list

//Logical Operators
//or()
//and()
    //ex: .find().or([ { name: 'Kid' }, { isPublished: true } ])
    //Find course with name 'Kid', OR isPublished is true


async function getCourses() {
    const courses = await Course
            .find({ author: 'Adrian Angara', isPublished: true })
            .limit(10)
            .sort({name: 1})
            .select({name: 1, tags: 1});
    console.log(courses);
}

// createCourse();

getCourses();

