"# Assignment-6" 


#### 1) What is the difference between var, let, and const?

Var:Function Scoped,initially Undefined

Let:Block-Scoped,value can change

const:Block-scope,value should not be reassinged,

Var Re-declaration allowed,Let Not allowed in the same scope, Const not allowed




#### 2) What is the difference between map(), forEach(), and filter()? 

forEach()=Return undifined,use for loop
map()=Returns new array,use transform all element
filter()=Return new array,use pick element by condition

#### 3) What are arrow functions in ES6?
Arrow function is a shorter way to write function in javascript.
The syntax is => (arrow) syntax

#### 4) How does destructuring assignment work in ES6?

Destructuring assignment is a short way to extract value from arrays or object into variables

example:const person = { name: "Sakib", age: 22, city: "Dhaka" };

// Traditional way
// const name = person.name;
// const age = person.age;

// ES6 Destructuring
const { name, age } = person;   
console.log(name, age);    

#### 5) Explain template literals in ES6. How are they different from string concatenation?
Templte literlas are a new way to work strings in javaScript in ES6.They use backtick() insted of single quates

Syntax:`Hello ${name}!`

Difference Between template literals and string concatenation

template literals: Syntax:`Hello ${name}!`,Readability:Harder, more symbols

string concatenation:Syntax:"Hello " + name + "!",Readability:Cleaner, easier



