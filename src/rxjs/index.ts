import {
    Subject,
    combineLatest,
    delay,
    filter,
    forkJoin,
    fromEvent,
    interval,
    map,
    merge,
    of,
    scan,
    startWith,
    take,
    tap,
    withLatestFrom,
} from "rxjs";
import { basics } from "./basics";

// basics();

const runners: string[] = [scan.name];

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
    // startWith
    // Starts emitting with given predefined values
    if (!runners.includes(startWith.name)) return;

    const subj = new Subject<number>();
    const subj$ = subj.asObservable().pipe(startWith(3, 5));

    subj$.subscribe((val) => console.log(val));
})();

(() => {
    // scan
    // Can be used to keep track of application state

    const parent = document.querySelector(".scan-1");

    const obs$ = fromEvent(parent.querySelectorAll("input"), "click").pipe(
        map((e: PointerEvent) => +(e.target as HTMLInputElement).value),
        scan(
            (acc, cur) => ({
                counter: acc.counter + cur,
                values: [...acc.values, cur],
            }),
            { counter: 0, values: [] }
        ),
        tap(({ values }) => {
            if (!runners.includes(scan.name)) return;
            console.log(values);
        })
    );

    const sum$ = obs$.pipe(
        map(({ values }) => values.reduce((acc, cur) => acc + cur))
    );

    sum$.subscribe((x) => (parent.querySelector(".counter").textContent = x));
})();

(() => {
    return;

    const parent = document.querySelector(".scan-2");

    const observables = Array.from(parent.querySelectorAll("input")).map((el) =>
        fromEvent(el, "input")
    );

    const obs$ = merge(...observables).pipe(
        map(({ target }: Event) => {
            const { name: key, value } = target as HTMLInputElement;
            return [key, value];
        }),
        scan(
            (acc, [key, value]) => ({
                ...acc,
                lastChanged: [key, value],
                formData: { ...acc.formData, [key]: value },
            }),
            { formData: {} }
        )
    );

    obs$.subscribe((data) => console.log(data));
})();

(() => {
    if (!runners.includes(merge.name)) return;

    const resistance = 50;
    const amount = 15;

    const obs1$ = interval(resistance).pipe(take(amount));
    const obs2$ = interval(3 * resistance).pipe(take(amount / 3));
    const obs3$ = interval(5 * resistance).pipe(take(amount / 5));

    const merged = merge(obs1$, obs2$, obs3$);
    merged.subscribe((d) => console.log(d));
})();
