let grades = [50,89,75,84,99,52];
let sum = 0;

//Using a normal array indexing 
for (let i = 0; i<grades.length; i++) 
{
    if (i%3 == 0)
    {
       sum += grades[i];
    }
    console.log(grades[i]);
}

console.log(sum);
let result = sum / grades.length;
console.log(result);

//Using for...of loop
sum = 0;
for (let item of grades)
{
    sum += item;
}

console.log(sum);
result = sum / grades.length;
console.log(result);

const countries = ['Germany', 'France', 'Italy', 'USA', 'Canada'];
//let country1 = countries[0];
//let country2 = countries[1];
//let country3 = countries[2];

//let [country1, ,country2] = countries;
[country1, ,...country2] = countries;
console.log(country1, country2);

//forEach
countries.forEach((value, index) =>{
    console.log("This is",value, "of index", index);
})

// same same but longer for forEach
countries.forEach(printNum);

function printNum(value, index)
{
    console.log("This is",value, "of index", index);
}

//find

const numbers = [15, 23, 8, 42, 4];
const firstLargeNumber = numbers.find(num => num === 5);
console.log(firstLargeNumber);

if (firstLargeNumber)
{ 
    console.log("Hey we found the number!");
}
else
{ 
    console.log("Sorry could not find the number ysou are looking for!");
}