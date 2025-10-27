const student = {
    name: "Maria Garcia",
    contact: {
        email: "maria@email.com",
        phone: "555-1234",
        address: {
            street: "123 Main St",
            city: "Springfield",
            country: "Canada"
    }
},
courses: ["Math, Science, Literature"]
};

console.log(student.contact.email);
console.log(student.contact?.address?.city);
console.log(student.emergency?.phone);