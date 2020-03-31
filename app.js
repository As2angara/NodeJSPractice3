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
        name: 'Spring Course',
        author: 'Adrianooo',
        tags: [ 'spring', 'frontend' ],
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

async function updateCourse(id) {
    const course = await Course.findById(id);

    if(!course) return;

    course.author = 'another author';
    //Alternatively
    // course.set({
    //      name: '',
    //      author: ' '
    // });
    const result = await course.save();
    console.log(result);
}

async function removeCourse(id) {
    const result = await Course.findByIdAndRemove(id);
    console.log(result);

}

//CRUD Operations
// createCourse();
// getCourses();
// updateCourse('5e8390b3f1c8bc1a04e2e7f7');
removeCourse('5e839c0a348b551b34971c22');

