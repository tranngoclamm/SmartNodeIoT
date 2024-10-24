<template>
    <div class="developer__datastream-wrapper">
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
                          <button class="d-flex align-items-center btn-add-datastream outline-none fw-600 mt-1" type="button" title="Add new datastream">
                            <img class="fa add-icon mr-2 logo-img" src="@/assets/images/new-55-256.png" alt="">
                            <span>
                              New Datastream
                            </span>
                          </button>
                          <button class="btn outline-none" type="button" title="Delete selected datastreams">
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
                              <input name="btSelectAll" type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                            </th>
                            <th class="text-center">ID</th>
                            <th style="text-align:left !important">Name</th>
                            <th>Color</th>
                            <th>Pin</th>
                            <th>Data Type</th>
                            <th style="text-align:center !important">Units</th>
                            <th style="text-align:center !important">Min</th>
                            <th style="text-align:center !important">Max</th>
                            <th style="text-align:center !important">Default value</th>
                            <th class="td-actions text-right" style="text-align:center !important">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(datastream, index) in filteredDatastreams" :key="index">
                            <td class="bs-checkbox">
                              <input type="checkbox" v-model="selected[index]" />
                            </td>
                            <td class="text-center">{{ datastream.id }}</td>
                            <td>{{ datastream.name }}</td>
                            <td class="pl-4">
                              <div class="color-preview-specific" :style="{ backgroundColor: datastream.color, borderColor: darkenColor(datastream.color) }"></div>
                            </td>
                            <td>{{ datastream.pin }}</td>
                            <td>{{ datastream.data_type }}</td>
                            <td class="text-center">{{ datastream.units }}</td>
                            <td class="text-center">{{ datastream.min }}</td>
                            <td class="text-center">{{ datastream.max }}</td>
                            <td class="text-center">{{ datastream.default_value }}</td>
                            <td class="td-actions text-center">
                              <a class="btn btn-link btn-info table-action view outline-none" href="javascript:void(0)">
                                <i class="fa-regular fa fa-pen-to-square"></i>
                                <i class="fa fa-edit"></i> edit
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
    name:'DatastreamContent',
    data() {
      return {
        selectAll: false,
        selected: [],
        searchQuery: '',
        columns: [
          { name: 'ID', visible: true },
          { name: 'Pin', visible: true },
          { name: 'Data Type', visible: true },
          { name: 'Units', visible: true },
          { name: 'Min', visible: true },
          { name: 'Max', visible: true },
          { name: 'Default Value', visible: true },
        ],
        datastreams: [
          { id: 1, name: 'LIGHT', color: '#3a97e6', pin: 'V1', data_type: 'Integer', units: '%', min: '0', max: '100', default_value: '56' },
          { id: 2, name: 'HUMIDITY', color: '#42d0ed', pin: 'V2', data_type: 'Float', units: '%', min: '0', max: '100', default_value: '56' },
          { id: 3, name: 'SOIL_MOISTURE', color: '#fb404b', pin: 'V3', data_type: 'String', units: '%', min: '0', max: '100', default_value: '56' },
        ],
      };
    },
    methods: {
      toggleSelectAll() {
      // Nếu "selectAll" được tick, chọn tất cả, nếu không thì bỏ tick tất cả
      this.selected = this.selectAll
        ? this.filteredDatastreams.map(() => true)
        : this.filteredDatastreams.map(() => false);
    },
      darkenColor(color) {
        // Hàm để làm tối màu bằng cách giảm độ sáng của màu gốc
        const colorValue = parseInt(color.slice(1), 16);
        const r = (colorValue >> 16) - 20;
        const g = ((colorValue >> 8) & 0x00FF) - 20;
        const b = (colorValue & 0x0000FF) - 20;
        
        return `rgb(${Math.max(0, r)}, ${Math.max(0, g)}, ${Math.max(0, b)})`;
      }
  },
    computed: {
      filteredDatastreams() {
        const query = this.searchQuery.toLowerCase();
        return this.datastreams.filter(
          (datastream) =>
            datastream.name.toLowerCase().includes(query) ||
            datastream.pin.toLowerCase().includes(query) ||
            datastream.data_type.toLowerCase().includes(query) ||
            datastream.units.toLowerCase().includes(query) ||
            datastream.min.toLowerCase().includes(query) ||
            datastream.max.toLowerCase().includes(query) ||
            datastream.default_value.toLowerCase().includes(query)
        );
      },
    },
    mounted() {
      // axios.get('/api/datastreams').then(response => {
      //   this.datastreams = response.data;
      // });
    },
    watch: {
      // Khi danh sách `filteredDatastreams` thay đổi, cập nhật lại mảng selected
      filteredDatastreams() {
        this.selected = this.filteredDatastreams.map(() => false);
      }
    },
  };
  </script>
        
