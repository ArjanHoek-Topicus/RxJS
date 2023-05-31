import { fromEvent, scan, take, throttleTime } from 'rxjs';

// RxJS is able to produce values using pure functions, making code less prone to errors.

const observable = fromEvent(document, 'click').pipe(
  throttleTime(1000), // Make sure that there is at least 1000 seconds between each subsequent event firing
  scan(count => count + 1, 0) // The 'scan' operator works like the Array object's 'reduce' method
);

const subscription = observable.subscribe(count =>
  console.log(`Clicked ${count} times`)
);

setTimeout(() => {
  subscription.unsubscribe();
}, 10000);
