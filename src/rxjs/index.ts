import { map, of, take, tap } from "rxjs";
import { multiplyBy } from "./custom-operators";

let counter = 0;

const obs = of(0, 1, 2, 3, 4, 5).pipe(
    map((val) => val + 1), // Transforming operator to transform data
    multiplyBy(100, { log: true }),
    tap((val) => (counter += val)), // Utility operator to perform side effect
    take(2) // Filtering operator that makes output observable complete
);

obs.subscribe({
    next: (val) => {
        console.log(`Add value: ${val}`);
    },
    complete: () => {
        console.log(`Completed: ${counter}`);
    },
});
