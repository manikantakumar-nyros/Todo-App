<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <CreateTodo msg="Creating Todo"/>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import CreateTodo from '@/components/CreateTodo.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    CreateTodo
  }
}
</script>
