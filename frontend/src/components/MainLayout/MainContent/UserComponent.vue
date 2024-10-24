<template>
    <div class="content user-wrapper">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card bootstrap-table">
              <div class="card-body table-full-width">
                <div class="bootstrap-table">
                    <div class="fixed-table-toolbar" style="display: flex; align-items: center; position: relative;">
                        <!-- Search bar ở giữa -->
                        <div class="search" style="position: absolute; left: 50%; transform: translateX(-50%);">
                          <input class="form-control" type="text" placeholder="Search" v-model="searchQuery" style="height: 32px; width: 200px;"/>
                        </div>
                      
                        <!-- Icon buttons sát bên phải -->
                        <div class="columns columns-right " style="margin-left: auto; display: flex; gap: 10px;">
                          <button class="btn btn-add-user btn- outline-none fw-600" type="button" title="Add users" style="color: aquarin; font-size: 13px">
                            <img class="fa fa-add-user mr-2 logo-img" src="@/assets/images/user-plus-solid.svg" alt="">
                            <i class="fa-solid fa-user-plus"></i>
                            Add users
                          </button>
                          <button class="btn outline-none" type="button" title="Delete users">
                            <img class="fa mr-2 logo-img" src="@/assets/images/delete-181.svg" alt="">
                          </button>
                          <div class="keep-open btn-group" title="Columns">
                            <ul class="dropdown-menu" role="menu">
                              <li v-for="(column, index) in columns" :key="index">
                                <label>
                                  <input type="checkbox" v-model="column.visible" /> {{ column.name }}
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      
                  <div class="fixed-table-container" style="padding-bottom: 0px;">
                    <div class="fixed-table-body">
                      <table id="bootstrap-table" class="table table-hover">
                        <thead>
                          <tr>
                            <th class="bs-checkbox">
                              <input name="btSelectAll" type="checkbox" />
                            </th>
                            <th class="text-center">ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Phone Number</th>
                            <th class="td-actions text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(user, index) in filteredUsers" :key="index">
                            <td class="bs-checkbox">
                              <input type="checkbox" />
                            </td>
                            <td class="text-center">{{ user.id }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.role }}</td>
                            <td>{{ user.phoneNumber }}</td>
                            <td class="td-actions text-center">
                              <a class="btn btn-link btn-info table-action view outline-none" href="javascript:void(0)">
                                <i class="fa-regular fa fa-pen-to-square"></i>
                                <i class="fa fa-edit"></i> change role
                              </a>
                              <a class="btn btn-link btn-normal table-action outline-none" href="javascript:void(0)">
                                <img class="fa mr-2 logo-img tfly-1" src="@/assets/images/system-log-1.svg" alt="">
                                get device log
                              </a>
                              <a class="btn btn-link btn-danger table-action remove outline-none" href="javascript:void(0)">
                                <i class="fa fa-remove"></i> delete
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:'UserComponent',
    data() {
      return {
        searchQuery: '',
        columns: [
          { name: 'ID', visible: true },
          { name: 'Name', visible: true },
          { name: 'Email', visible: true },
          { name: 'Role', visible: true },
          { name: 'Phone Number', visible: true },
          { name: 'Actions', visible: true },
        ],
        users: [
          { id: 1, name: 'Dakota Rice', email: 'tranngoclamm.lnt@gmail.com', role: 'Admin', phoneNumber: '+0385968714' },
          { id: 2, name: 'Minerva Hooper', email: 'hooper@example.com', role: 'Editor', phoneNumber: '+0398765432' },
          { id: 3, name: 'Sage Rodriguez', email: 'rodriguez@example.com', role: 'User', phoneNumber: '+0312345678' },
        ],
      };
    },
    computed: {
      filteredUsers() {
        const query = this.searchQuery.toLowerCase();
        return this.users.filter(
          (user) =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.role.toLowerCase().includes(query)
        );
      },
    },
    mounted() {
      // axios.get('/api/users').then(response => {
      //   this.users = response.data;
      // });
    },
  };
  </script>
        
