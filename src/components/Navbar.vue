<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="orlen-color">
      <b-navbar-brand href="#">Qubit</b-navbar-brand>
      <!--  On the middle  -->
      <b-navbar-brand class="brand-center"> <b> CONFIGURATION CHECKER </b> </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#/">Requirements</b-nav-item>
          <b-nav-item href="#/raports">Raports</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto center-768">
          <img src="../assets/orlen-logo.png">
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: "navbar"
  }
</script>

<style scoped>
  .orlen-color {
    background-color: #5a5a5a !important;
  }
  img {
    width: 5vw;
  }
  .brand-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  @media only screen and (max-width: 980px) {

    .brand-center {
      position: relative !important;
      left: auto;
      transform: translateX(0%);
    }

    .center-768 {
      display: block !important;
    }
  }

</style>
