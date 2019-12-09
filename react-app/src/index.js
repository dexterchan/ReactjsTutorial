import React, { Component } from "react";
import ReactDOM from "react-dom";

const element = <h1> Hello World </h1>;
console.log(element);
ReactDOM.render(element, document.getElementById("root"));

const person = {
  name: "egg",
  walk() {
    console.log(this.name, " is walking");
  }
};

person.walk();

const walk = person.walk;
//walk(); //return undefined when called in global scope
const walkwithBind = person.walk.bind(person); // bind person to "this" in the person object
walkwithBind();

const square = function(n) {
  return n * n;
};
const square2 = n => n * n;

const jobs = [
  { id: 1, isActive: true },
  { id: 2, isActive: true },
  { id: 3, isActive: false }
];
console.log(jobs.filter(j => j.isActive));

//arrow function not rebind this
const person_arrow = {
  talk() {
    setTimeout(() => {
      console.log("this", this);
    }, 1000);
  }
};
person_arrow.talk();

const colors = ["red", "green", "blue"];
const colorItems = colors.map(c => <li>{c}</li>);

ReactDOM.render(colorItems, document.getElementById("root"));

const address = {
  street: "",
  city: "",
  country: ""
};
const { street, city, country } = address;

//Spread operator ....
const first = [1, 2, 3];
const second = [4, 5, 6];
const combined = [...first, ...second];
const person1 = { name: "pig" };
const person2 = { address: "earth" };
const combinedPerson = { ...person1, ...person2, job: "instructor" };
console.log(combinedPerson);
