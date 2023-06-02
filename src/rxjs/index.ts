import { catchError, map, of, take, tap } from "rxjs";
import { multiplyBy } from "./custom-operators";

let counter = 0;

const obs$ = of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
    map((val) => val + 1), // Transforming operator to transform data
    map((val) => {
        if (val === 3) {
            throw `Warning: ${val} is not allowed!`;
        }
        return val;
    }), // Create an error to be caught by the catchError operator
    catchError((err) => {
        console.warn(err);
        return of(9, 10, 11, 12, 13, 14);
    }), // Handle errors by returning an observable
    multiplyBy(100, { log: false }), // Custom operator
    tap((val) => (counter += val)), // Utility operator to perform side effect
    take(4) // Filtering operator that makes output observable complete
);

obs$.subscribe({
    next: (val) => {
        console.log(`Add value: ${val}`);
    },
    complete: () => {
        console.log(`Completed: ${counter}`);
    },
});
