import { Observable, map } from "rxjs";

export const multiplyBy =
    (mValue: number, { log }: { log: boolean }) =>
    (obs$: Observable<number>) =>
        obs$.pipe(
            map((val) => {
                if (log) {
                    console.log(val);
                }
                return val * mValue;
            })
        );
