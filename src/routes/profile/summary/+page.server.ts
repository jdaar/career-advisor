import { createUserProfile } from '$lib/redis';
import type { ListedData } from '$lib/types';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ cookies, request }) => {
        const data = await request.formData();
        const skills = data.get('skills')?.toString().split('\0');
        const experience = data.get('experience')?.toString().split('\0').reduce((acc, val, i, arr) => {
            if (i % 3 === 0) {
                acc.push({
                    title: val,
                    subtitle: arr[i + 1],
                    description: arr[i + 2]
                });
            }
            return acc;
        }, [] as ListedData[]);
        const education = data.get('education')?.toString().split('\0').reduce((acc, val, i, arr) => {
            if (i % 3 === 0) {
                acc.push({
                    title: val,
                    subtitle: arr[i + 1],
                    description: arr[i + 2]
                });
            }
            return acc;
        }, [] as ListedData[]);
        const projects = data.get('projects')?.toString().split('\0').reduce((acc, val, i, arr) => {
            if (i % 3 === 0) {
                acc.push({
                    title: val,
                    subtitle: arr[i + 1],
                    description: arr[i + 2]
                });
            }
            return acc;
        }, [] as ListedData[]);
 
        const user = {
            name: data.get('name') as string,
            email: data.get('email') as string,
            cellphone: data.get('cellphone') as string,
            yearsOfExperience: parseInt(data.get('yearsOfExperience') as string),
            skills: skills ?? [],
            experience: experience ?? [],
            education: education ?? [],
            projects: projects ?? []
        };

        createUserProfile(user);
        redirect(301, '/');
	},
} satisfies Actions;