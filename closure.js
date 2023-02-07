/**
 * When a pure function is executed it gets pushed onto the
 * call stack and its internal data is only kept until the
 * function gets popped off the call stack
 */
function pureFunction(a, b) {
  return a + b;
}
pureFunction(1, 2);

/**
 * But if the function uses external data, like a global variable,
 * it creates a closure to store the value of that variable into
 * the HEAP MEMORY(unlike the callstack [short lived] the heap memory
 * is long lived and will only be thrown away at a later point by the
 * garbage collector)
 */
let b = 3;
function impureFunction(a) {
  return a + b;
}
impureFunction(1);

/**
 * One of the benefits of closures is DATA ENCAPSULATION. That prevents
 * leaking or data exposure when its not needed.
 */
function outer() {
  let state = "Data";

  function inner() {
    // Has access to 'state' even though it's outside of its scope
    return `Hello ${state}`;
  }

  return inner;
}

/**
 * Another benefit is that it helps libraries creating FUNCTION FACTORIES
 * These type of functions take in data and return other functions that
 * use the data took in
 */
function alertFunction(message) {
  return () => {
    alert(`Message is ${message}`);
  };
}

const alertMom = alertFunction("Hi mom");
alertMom();

// ___________________________________________________

// Tricky stuff
for (var i = 0; i < 3; i++) {
  const log = () => {
    console.log(i);
  };

  setTimeout(log, 100);
}

// What's the output? Answer: 3, 3, 3

/**
 * Why?
 *
 * Well, since variables created with 'var' gets hoisted
 * so the 'log' function will log the current value of that variable
 * after 100ms (long after the for loop is finished)
 *
 * If, instead, we use 'let' to create that variable the result is '0, 1, 2'.
 * That's because 'let' created scoped variables, which means it doesn't
 * gets hoisted up. Therefore, the later iterations of the for loop is
 * creating new variables scoped inside for loop, not changing a hoisted variable
 * located outside the scope of the for loop.
 */

// To sum up: a closure is the combination of a function and its lexical environment
