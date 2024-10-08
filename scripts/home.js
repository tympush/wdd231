const year = document.querySelector("#currentyear");
const today = new Date();
year.innerHTML = `${today.getFullYear()}`;

const modified = document.querySelector("#lastModified");
modified.innerHTML = `Last Modification: ${document.lastModified}`



const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const certificateSection = document.querySelector("#courses");

function displayCourses(courses) {
    certificateSection.innerHTML = '';

    courses.forEach(course => {
        const courseDiv = document.createElement('div');
        courseDiv.classList.add('course');

        if (course.completed) {
            courseDiv.classList.add('completed');
        } else {
            courseDiv.classList.add('incomplete');
        }

        courseDiv.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;

        courseDiv.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        certificateSection.appendChild(courseDiv);
    });
}

function filterCourses(filter) {
    let filteredCourses;
    
    if (filter === 'CSE') {
        filteredCourses = courses.filter(course => course.subject === 'CSE');
    } else if (filter === 'WDD') {
        filteredCourses = courses.filter(course => course.subject === 'WDD');
    } else {
        filteredCourses = courses;
    }

    displayCourses(filteredCourses);
}

document.querySelectorAll('.filter-links a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const filter = this.getAttribute('data-filter');
        filterCourses(filter);
    });
});

filterCourses('all');



const creditTotalElement = document.getElementById('creditTotal');
const creditLeftElement = document.getElementById('creditLeft');

const totalCredits = courses
.reduce((sum, course) => sum + course.credits, 0);

const creditsLeft = courses
.filter(course => !course.completed)
.reduce((sum, course) => sum + course.credits, 0);

creditTotalElement.textContent = totalCredits;
creditLeftElement.textContent = creditsLeft;



const mainnav = document.querySelector(".navigation");
const hambutton = document.querySelector("#menu");

hambutton.addEventListener("click", () => {
    mainnav.classList.toggle("show");
    hambutton.classList.toggle("show");
});



const courseDetails = document.querySelector("#course-details");

function displayCourseDetails(course){
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
        <button id="closeModal">X</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>$course.title</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}${course.technology.join(', ')}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: </p>
    `;
    courseDetails.showModal();

    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}