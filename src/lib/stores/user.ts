import {
  type UserDetailsForm,
  type UserForm,
  UserDetailsFormDefault,
  UserFormDefault,
  UserFormSchema,
  UserDetailsFormSchema,
} from "$lib/types";
import { combineLatest, map, Observable } from "rxjs";
import {
  createSvelteBehaviourSubject,
} from ".";

export function createUserStore() {
  const defaults = {
    ...UserFormDefault,
    ...UserDetailsFormDefault,
  };

  const name$ = createSvelteBehaviourSubject<UserForm["name"]>(defaults.name);
  const email$ = createSvelteBehaviourSubject<UserForm["email"]>(
    defaults.email,
  );
  const cellphone$ = createSvelteBehaviourSubject<UserForm["cellphone"]>(
    defaults.cellphone,
  );

  const education$ = createSvelteBehaviourSubject<UserDetailsForm["education"]>(
    defaults.education,
  );
  const experience$ = createSvelteBehaviourSubject<
    UserDetailsForm["experience"]
  >(defaults.experience);
  const projects$ = createSvelteBehaviourSubject<UserDetailsForm["projects"]>(
    defaults.projects,
  );
  const skills$ = createSvelteBehaviourSubject<UserDetailsForm["skills"]>(
    defaults.skills,
  );

  const UserFormSubject = combineLatest([name$, email$, cellphone$]).pipe(
    map(([name, email, cellphone]) =>
      UserFormSchema.safeParse({ name, email, cellphone })
    ),
    map((user) => {
      if (user.success) {
        return {
          error: null,
          data: user.data,
        };
      } else {
        return {
          error: Object.entries(user.error.formErrors.fieldErrors).flatMap(
            (v) => ({ field: v[0], message: v[1] })
          ),
          data: UserFormDefault,
        };
      }
    }),
  );

  const UserDetailsFormSubject = combineLatest([
    education$,
    experience$,
    projects$,
    skills$,
  ]).pipe(
    map(([education, experience, projects, skills]) => UserDetailsFormSchema.safeParse({ education, experience, projects, skills })),
    map((user) => {
      if (user.success) {
        return {
          error: null,
          data: user.data,
        };
      } else {
        return {
          error: Object.entries(user.error.formErrors.fieldErrors).flatMap(
            (v) => ({ field: v[0], message: v[1] })
          ),
          data: UserDetailsFormDefault,
        };
      }
    }),
  );

  const UserObservable = combineLatest([
    UserFormSubject,
    UserDetailsFormSubject,
  ]).pipe(
    map(([userForm, userDetailsForm]) => ({
      ...userForm.data,
      ...userDetailsForm.data,
    })),
  );

  const error$: Observable<Array<{ field: string; message: string[] }>> =
    combineLatest([UserFormSubject, UserDetailsFormSubject]).pipe(
      map(([userForm, userDetailsForm]) => {
        const errors = [
          ...(userForm.error ?? []),
          ...(userDetailsForm.error ?? []),
        ].reduce((acc, curr) => {
          return [...acc.filter((v: {field: string}) => v.field !== curr.field), curr];
        }, [] as Array<{ field: string; message: string[] }>);
        return errors;
      }),
    );

  return {
    name$,
    email$,
    cellphone$,
    education$,
    experience$,
    projects$,
    skills$,
    error$,
    UserObservable,
  };
}
