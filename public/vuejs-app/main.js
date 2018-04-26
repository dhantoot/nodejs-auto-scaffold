
import Vue from 'vue';
import VueRouter from 'vue-router';

/*const NotFound = { template: '<p>Page not found</p>' };
const Home = { template: '<p>home page</p>' };
const About = { template: '<p>about page</p>' };

console.log('window.location.pathname ',window.location.pathname);

const routes = {
    '/': Home,
    '/about': About
};*/

//Register Navbar component
/*Vue.component('navbar-component', {
    template: `<nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                    <a class="navbar-brand" href="#">ACME INTL</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button> </nav>`,
});*/

//Register Page header component
/*Vue.component('page-heading-component', {
    template: '<h1 class="text-center">{{heading}}</h1>',
    data: function() {
        return {
            heading: 'ACME Staff List'
        }
    }
});*/
/*Vue.component('create-staff-component', {
    template: '<button v-on:click="createStaff">Create</button>',
    methods: {
        createStaff : function (event) {
            alert('create staff');
        }
    }
});*/
//Register staff list component
/*Vue.component('staff-list-component', {
    template: `<table class="table table-bordered"> 
                    <tbody>
                        <tr v-for="staff in staffs"> 
                            <td>{{staff.name}}</td> 
                            <td>{{staff.email}}</td> 
                            <td>{{staff.role}}</td>
                            <td><button v-on:click="updateStaff">Edit</button></td>
                            <td><button v-on:click="deleteStaff">Delete</button></td>
                        </tr>
                    </tbody>
                </table>`,
    data: function() {
        return {
            staffs: [{
                name: 'John Doe',
                email: 'John.doe@acme.org',
                role: 'Central Executive Officer'
            }, {
                name: 'Rebbecca Dan',
                email: 'rebbecca.dan@acme.org',
                role: 'Backend Developer'
            }, {
                name: 'Tope Joshua',
                email: 'tope.joshua@acme.org',
                role: 'Financial Analyst'
            }, {
                name: 'Alima Fatima',
                email: 'alima.fatima@acme.org',
                role: 'Deputy CTO'
            }, {
                name: 'Sikiru Oluwaseun',
                email: 'sikiru.oluwaseun@acme.org',
                role: 'Project Manager'
            }, {
                name: 'Larry Greg',
                email: 'larry.greg@acme.org',
                role: 'Senior Developer'
            }, {
                name: 'Inna Brown',
                email: 'inna.brown@acme.org',
                role: 'Community Manager'
            }, {
                name: 'Tunde Ogundipe',
                email: 'tunde.ogundipe@acme.org',
                role: 'Chief Technology Officer'
            }, {
                name: 'Bald Kuma',
                email: 'bald.kuma@acme.org',
                role: 'Human Resource'
            }, {
                name: 'Ramon Aduragbemi',
                email: 'ramon.aduragbemi@acme.org',
                role: 'System Administrator'
            }, ]
        }
    },
    methods: {
        updateStaff: function (event) {
            alert('Editing record ');
        },
        deleteStaff: function (event) {
            alert('successfully deleted');
        }
    }
});*/

//Root Instance
/*
new Vue({
    el: '#app',
    data: {
    }
});

Vue.use(VueRouter);*/

const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
    router
}).$mount('#app');
