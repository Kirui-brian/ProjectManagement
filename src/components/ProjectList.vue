<template>
    <div>
        <h1>Projects</h1>
        <ul>
            <li v-for="project in projects" :key="project.id">
                {{ project.name }} - {{ project.description }}
                <button @click="editProject(project)">Edit</button>
                <button @click="deleteProject(project)">Delete</button>
            </li>
        </ul>
        <form v-if="showForm" @submit.prevent="saveProject">
            <input v-model="projectName" type="text" placeholder="Name">
            <input v-model="projectDescription" type="text" placeholder="Description">
            <button>Save</button>
        </form>
        <button @click="showForm = true">New Project</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            projects: [],
            showForm: false,
            projectName: '',
            projectDescription: '',
            editProjectId: null,
        };
    },
    created() {
        axios.get('/api/projects/')
            .then(response => {
                this.projects = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    },
    methods: {
        saveProject() {
            if (this.editProjectId) {
                axios.patch(`/api/projects/${this.editProjectId}/`, {
                    name: this.projectName,
                    description: this.projectDescription,
                })
                    .then(() => {
                        this.showForm = false;
                        const projectIndex = this.projects.findIndex(project => project.id === this.editProjectId);
                        if (projectIndex !== -1) {
                            this.projects.splice(projectIndex, 1, {
                                id: this.editProjectId,
                                name: this.projectName,
                                description: this.projectDescription,
                            });
                        }
                        this.editProjectId = null;
                        this.projectName = '';
                        this.projectDescription = '';
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                axios.post('/api/projects/', {
                    name: this.projectName,
                    description: this.projectDescription,
                })
                    .then(response => {
                        this.showForm = false;
                        this.projects.push(response.data);
                        this.projectName = '';
                        this.projectDescription = '';
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        editProject(project) {
            this.showForm = true;
            this.projectName = project.name;
            this.projectDescription = project.description;
            this.editProjectId = project.id;
        },
        deleteProject(project) {
            axios.delete(`/api/projects/${project.id}/`)
                .then(() => {
                    this.projects = this.projects.filter(p => p.id !== project.id);
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
};
</script>
