<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <!-- <a href="#" class="navbar-brand">Dashboard</a> -->
      <i class="nc-icon nc-atom"></i>
      <select class="navbar-brand">
        <option>SmartGreenHouse</option>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </select>
      <div class="org-switcher__logo__divider" style="margin-left:10px">|</div>
      <button type="button" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler navbar-toggler-right">
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
        <span class="navbar-toggler-bar burger-lines"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="nav navbar-nav mr-auto">
          <!-- <li :class="['dropdown nav-item', { show: isDropdownOpen.dropdown1 }]" aria-haspopup="true" :aria-expanded="isDropdownOpen.dropdown1">
            <a @click.stop="toggleDropdown('dropdown1')" class="nav-link dropdown-toggle">
              <i class="nc-icon nc-bell-55"></i>
              <span class="notification">5</span>
            </a>
            <div class="dropdown-menu" v-show="isDropdownOpen.dropdown1">
              <a href="#" class="dropdown-item">Notification 1</a>
              <a href="#" class="dropdown-item">Notification 2</a>
              <a href="#" class="dropdown-item">Notification 3</a>
              <a href="#" class="dropdown-item">Notification 4</a>
              <a href="#" class="dropdown-item">Another notification</a>
            </div>
          </li> -->
          <button type="button" class="nav-item ant-btn ant-btn-default ui-kit-button ant-btn-primary">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path></svg>
          </button>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li :class="['dropdown nav-item', { show: isDropdownOpen.dropdown1 }]" aria-haspopup="true" :aria-expanded="isDropdownOpen.dropdown1">
            <a @click.stop="toggleDropdown('dropdown1')" class="nav-link dropdown-toggle">
              <i class="nc-icon nc-bell-55"></i>
              <span class="notification">5</span>
            </a>
            <div class="dropdown-menu" v-show="isDropdownOpen.dropdown1">
              <a href="#" class="dropdown-item">Notification 1</a>
              <a href="#" class="dropdown-item">Notification 2</a>
              <a href="#" class="dropdown-item">Notification 3</a>
              <a href="#" class="dropdown-item">Notification 4</a>
              <a href="#" class="dropdown-item">Another notification</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link">
              <i class="nc-icon nc-spaceship"></i>
            </a>
          </li>

          <li :class="['dropdown nav-item', { show: isDropdownOpen.dropdown2 }]" aria-haspopup="true" :aria-expanded="isDropdownOpen.dropdown2">
            <a @click.stop="toggleDropdown('dropdown2')" class="nav-link dropdown-toggle">
              <i class="nc-icon nc-support-17"></i>
            </a>
            <div class="dropdown-menu" v-show="isDropdownOpen.dropdown2">
              <a href="#" class="dropdown-item">Action</a>
              <a href="#" class="dropdown-item">Another action</a>
              <a href="#" class="dropdown-item">Something</a>
              <a href="#" class="dropdown-item">Another action</a>
              <a href="#" class="dropdown-item">Something</a>
              <div class="divider"></div>
              <a href="#" class="dropdown-item">Separated link</a>
            </div>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarComponent',
  data() {
    return {
      isDropdownOpen: {
        dropdown1: false,
        dropdown2: false,
      }
    };
  },
  methods: {
    toggleDropdown(dropdown) {
      const isCurrentlyOpen = this.isDropdownOpen[dropdown];
      this.closeAllDropdowns();
      if (!isCurrentlyOpen) {
        this.isDropdownOpen[dropdown] = true;
      }
    },
    closeAllDropdowns() {
      this.isDropdownOpen = {
        dropdown1: false,
        dropdown2: false,
      };
    },
    handleOutsideClick(event) {
      const targetElement = event.target;
      if (!targetElement.closest('.dropdown-menu') && !targetElement.closest('.dropdown-toggle')) {
        this.closeAllDropdowns();
      }
    },
    handleGlobalClick(event) {
      if (!this.$el.contains(event.target)) {
        this.closeAllDropdowns();
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleGlobalClick);
  },
  beforeUnmount() {  // Đã thay thế beforeDestroy bằng beforeUnmount
    document.removeEventListener('click', this.handleGlobalClick);
  }
};
</script>

