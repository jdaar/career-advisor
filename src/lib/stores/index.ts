import { BehaviorSubject, ReplaySubject, Subject } from "rxjs";

export function createSvelteBehaviourSubject<T>(defaultValue: T) {
    const subject  = new BehaviorSubject<T>(defaultValue) as BehaviorSubject<T> & { set: (value: T) => void };
    subject.set = subject.next;
    return subject;
}

export function createSvelteReplaySubject<T>() {
    const subject  = new ReplaySubject<T>(1000) as ReplaySubject<T> & { set: (value: T) => void };
    subject.set = subject.next;
    return subject;
}

export function createSvelteSubject<T>() {
    const subject  = new Subject<T>() as Subject<T> & { set: (value: T) => void };
    subject.set = subject.next;
    return subject;
}