const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });
    return schema.validate(course);
}

app.get('/', (req, res) => {
    res.send('Hello, World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find((item) => item.id === parseInt(req.params.id, 10));
    if (!course) {
        return res.status(404).send('Not Found');
    }
    return res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    return res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find((item) => item.id === parseInt(req.params.id, 10));
    if (!course) {
        return res.status(404).send('Not Found');
    }
    const { error } = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    course.name = req.body.name;
    return res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find((item) => item.id === parseInt(req.params.id, 10));
    if (!course) {
        return res.status(404).send('Not Found');
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    return res.send(course);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
