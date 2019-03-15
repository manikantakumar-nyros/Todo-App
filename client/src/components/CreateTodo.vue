<template>
<div>
  <div class="main_page">
    <h4 class="text-center">Todo App</h4>
    <b-form @submit.prevent="onSubmit">
    	<b-input-group class="mt-3">
    	<b-form-input placeholder="Todo Name" v-model="todo_name" type="text" :class="{red_error:todo_err}" />
    		<b-input-group-append>
    		<b-button variant="info" type="submit">Submit</b-button>
    		</b-input-group-append>
    	</b-input-group>
    </b-form>
    <p class="text-info" v-if="msg !== ''">{{ msg }}</p>
    <hr>
    <b-alert v-if="todos.length > 0" title="Delete Todo" fade show v-for="(todo, index) in todos" :key="index">{{ todo.name }} <span class="delete_icon" @click="deleteTodo(todo._id)">
      <i class="fas fa-times-circle"></i>
      <b-button variant="danger" type="submit">Delete</b-button>
      </span>
      <span class="update_icon">
      <i class="fas fa-times-circle"></i>
      <router-link :to="'/edit/'+ todo._id">
      <b-button variant="success" type="submit">Update</b-button>
      </router-link></span></b-alert>
    <p v-if="todos.length === 0" class="text-center">No Todos Available</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'CreateTodo',
  data() {
  	return{
  		todo_name:"",
  		todo_err:false,
  		msg:""
  	}
  },
  mounted () {
  	this.$store.dispatch('GET_TODOS')
  },
  methods:{
  	onSubmit(){
  		if (this.todo_name === "") { 
  			this.todo_err = true
  		} else {
  			this.todo_err = false
  		}
  		if(!this.todo_err){
  			let data = { name: this.todo_name };

  			this.$store.dispatch('SAVE_TODO', data).then((res)=> {
	  			if (res.status === "success") {
            this.msg = res.message
            this.$notify({
               group: 'foo',
               title: 'Create message',
               text: 'Created Successfully!'
                });
	  				this.todo_name = "";
	  			}
	  		});
      }
  	},
    deleteTodo (id) {
      let x = confirm("Are you sure you want to delete?");
       if (x){
      let data = { id: id }
      this.$store.dispatch('DELETE_TODO', data).then((res)=> {
        if (res.status === "success") {
          this.$notify({
               group: 'foo',
               title: 'Delete message',
               text: 'Deleted Successfully!'
                });
          this.$store.dispatch('GET_TODOS')
        }
      });
    }
  },
  }, 
  computed: {
    todos () {
      return this.$store.getters.TODOS;
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main_page {
		margin: 8% 20% 0% 20%;
	}
.red_error {
		box-shadow: 0px 0px 5px 2px red;
		border-color: red;
	}
.delete_icon {
    float: right;
    cursor: pointer;
    margin-left: 20px;
    margin-top: -8px;
    margin-right: -10px;
  }
.update_icon {
    float: right;
    cursor: pointer;
    margin-top: -8px;
  }
.fa-times-circle {
    font-size: 22px;
  }
</style>
