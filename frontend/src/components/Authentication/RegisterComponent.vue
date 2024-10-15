<template>
  <body class="landing-page landing-page2" spellcheck="false" style="user-select: none;">
    <nav class="navbar navbar-transparent navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
  
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <img src="@/assets/images/flags/US.png" />
                English(US)
                <b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
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
              <a href="/login">
                Login
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
        <h1 class="logo cursive" style="letter-spacing: 4px; margin-top: 90px">
          SmartNodeIot
        </h1>
        <div class="content">
          <div class="content">
            <div class="container">
              <div class="row">
                <div class="col-md-4 text-white col-sm-6 col-md-offset-4 col-sm-offset-3">
                  <form method="post" action="/register">
                    <div data-background="color" data-color="blue" class="card-transparent">
                      <div class="card-content">
                        <div class="form-group">
                          <label class="btn-fill ">Full Name </label> 
                          <input type="text" class="form-control transparent" placeholder="" />
                        </div>
                        <div class="form-group">
                          <label class="btn-fill ">Email </label> 
                          <input type="email" class="form-control transparent" placeholder="" />
                        </div>
                        <div class="form-group">
                          <label class="btn-fill ">Password </label> 
                          <input type="password" class="form-control transparent" placeholder="" />
                        </div>
                        <div class="form-group">
                          <label class="btn-fill ">Confirm Password </label> 
                          <input type="password" class="form-control transparent" placeholder="" />
                        </div>
                      </div>
                      <div class=".card-footer-transparent text-center" style="display: flex; align-items: center;justify-content: space-between;">
                        <div class="forgot btn-fill">
                          <a href="/login" class=" btn-fill">
                            Have an Account? 
                          </a>
                        </div>
                        <button type="submit" class="btn btn-info btn-fill">Register</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  
</template>
  <script>
  import '@/assets/css/bootstrap.css';
  import '@/assets/css/login.css'; 

  export default {
    name: "RegisterComponent",
  };
  </script>
  