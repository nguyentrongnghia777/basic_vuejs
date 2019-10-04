<template>
  <div>
    <p>App Layout</p>
    <br />
    <ul>
      <li>
        <router-link to="/home">Home</router-link>
      </li>
      <li>
        <router-link to="/users">Users</router-link>
      </li>
      <li>
        <router-link to="/products">Products</router-link>
      </li>
      <li>
        <router-link to="/demo">Demo</router-link>
      </li>
      <li>
        <router-link to="/auth/login">Login</router-link>
      </li>
    </ul>
    <hr/>
    <router-view></router-view>
  </div>
</template>


