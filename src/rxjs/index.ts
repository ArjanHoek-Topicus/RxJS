import {
    Subject,
    combineLatest,
    delay,
    forkJoin,
    map,
    of,
    startWith,
    tap,
    withLatestFrom,
} from "rxjs";
import { basics } from "./basics";

// basics();

const runners: string[] = [];

const arr1$ = of(1, 2, 3).pipe(delay(400));
const arr2$ = of(10, 20, 30);
const arr3$ = of(100, 200, 300);

(() => {
    if (!runners.includes(combineLatest.name)) return;

    // combineLatest:
    // Emits whenever any of the given input observables emits a new value
    // Starts emitting only when all input observables have emitted at least once
    // Output value contains the latest values of each input observable

    const output = combineLatest([arr1$, arr2$, arr3$]).pipe();

    output.subscribe((val) => {
        console.log(combineLatest.name);
        console.log(val);
    });
})();

(() => {
    // forkJoin
    // Emits when all input observables have completed
    // Output value contains the latest values of each input observable
    // Do not use with input observables that do not complete

    if (!runners.includes(forkJoin.name)) return;

    const output = forkJoin([arr1$, arr2$, arr3$]);

    output.subscribe((val) => {
        console.log(forkJoin.name);
        console.log(val);
    });
})();

(() => {
    // withLatestFrom
    // Creates an output observable that emits when the source observable emits
    // Source observable emits only when all input observables have emitted at least once
    // That means that if the source observable completes first, it will not emit any value

    if (!runners.includes(withLatestFrom.name)) return;

    const output = arr1$.pipe(withLatestFrom(arr2$, arr3$)); // arr1$ acts as the source observable here

    output.subscribe((val) => {
        console.log(withLatestFrom.name);
        console.log(val);
    });
})();

(() => {
    const subj = new Subject<number>();
    const subj$ = subj.asObservable().pipe(startWith(3, 5));

    subj$.subscribe((val) => console.log(val));
})();
