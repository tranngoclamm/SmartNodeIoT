<template>
  <body class="landing-page landing-page2" spellcheck="false" style="user-select: none;">
    <nav class="navbar navbar-transparent navbar-fixed-top" role="navigation">
      <div class="container">
        <!-- <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div> -->
  
        <div class="navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img src="@/assets/images/flags/US.png" />
                English(US)
                <b class="caret"></b>
              </a>
              <ul hidden class="dropdown-menu">
                <li>
                  <a href="#"><img src="@/assets/images/flags/DE.png" /> Việt Nam</a>
                </li>
                <li>
                  <a href="#"><img src="@/assets/images/flags/GB.png" /> English(UK)</a>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="/register">
                Register
              </a>
            </li>
            <li>
              <a href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="main">
      <video id="video_background" preload="auto" autoplay="true" loop="loop" muted="muted" volume="0" style="z-index: 1; position: fixed; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
        <source src="@/assets/videos/time.webm" type="video/webm" />
        <source src="@/assets/videos/time.mp4" type="video/mp4" />
        Video not supported
      </video>
      <div class="cover black" data-color="black"></div>
  
      <div class="container">
        <h1 class="logo cursive" style="letter-spacing: 4px;">
          SmartNodeIot
        </h1>
        <div class="content">
          <div class="content">
            <div class="container">
              <div class="row">
                <div class="col-md-4 text-white col-sm-12 col-md-offset-4 col-sm-offset-3">
                  <form @submit.prevent="handleLogin">
                    <div data-background="color" data-color="blue" class="card-transparent">
                      <div class="card-content">
                        <div class="form-group">
                          <label class="btn-fill ">Email </label> 
                          <input type="email" v-model="email" class="form-control transparent" placeholder="" />
                        </div>
                        <div class="form-group">
                          <label class="btn-fill ">Password </label> 
                          <input type="password" v-model="password" class="form-control transparent" placeholder="" />
                        </div>
                      </div>
                      <div class="card-footer text-center" style="display: flex; align-items: center;justify-content: space-between;">
                        <div class="forgot btn-fill">
                          <a href="/forgot-password" class=" btn-fill">
                            Forgot your password?
                          </a>
                        </div>
                        <button type="submit" class="btn btn-warning btn-fill">Let's go</button>
                      </div>
                      <div class="text-center btn-fill">
                        <div class="line-container">
                            <hr class="line">
                            <span class="line-text">OR</span>
                            <hr class="line">
                        </div>
                      </div>
                      <div class="subscribe text-center">
                        <h5 class="info-text">
                          <a href="#" class=" btn-fill ">
                            <i class="fa fa-google-plus-square" style="margin-right: 5px;"></i>
                            Login with Google
                          </a>
                        </h5>
              
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="container">Made with <i class="fa fa-heart heart"></i> by <a href="https://github.com/tranngoclamm/">LamTN</a>. For more detail <a href="https://github.com/tranngoclamm/">here.</a></div>
      </div>
    </div>
  </body>
  
</template>
  <script>
  import '@/assets/css/bootstrap.css';
  import '@/assets/css/login.css'; 
  import { loginUser, 
        // createProject
   } from '@/services/api'; // Import API login
  // import router from '@/router/index'; // Import Vue Router

  export default {
    name: "LoginComponent",
    data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        // const projectData = {
        //   projectName: 'thisprojectName',
        //   description: 'thisdescription',
        // };
        // const token1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiItT0JrOHEtWk80M2Rlam4tMlF5NiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczMTcwMzQ3NSwiZXhwIjoxNzMxNzA3MDc1fQ.HMeoEVwUZWIR3cdn7psz8bhKl120ed4rEK8rND4mGYw'
        // const res = await createProject(projectData, token1); // Gọi API
        const data = { email: this.email, password: this.password };
        const response = await loginUser(data);
        localStorage.setItem("token", response.data.token); // Lưu token
        localStorage.setItem("user", JSON.stringify(response.data.user)); 
        if(window.innerWidth < 992){
          this.$store.dispatch('closeSidebar');
        }
        this.$router.push("/dashboard"); // Chuyển hướng đến dashboard
      } catch (error) {
        console.error(error);
        alert("Login failed. Please check your credentials.");
      }
    },
  },
  };
  </script>
  