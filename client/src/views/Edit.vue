<template>
	<div>
  <div class="update">
    <h4 class="text-center">Update Page</h4>
    <b-form @submit.prevent="onSubmit">
    	<b-input-group class="mt-3">
    	<b-form-input placeholder="Todo Name" v-model.trim="todo.name" type="text" :class="{red_error:todo_err}" />
    		<b-input-group-append>
    		<b-button variant="info" type="submit">Submit</b-button>
    		</b-input-group-append>
    	</b-input-group>
    </b-form>
    <p class="text-info" v-if="msg !== ''">{{ msg }}
      <router-link to="/">Back to Home</router-link>
    </p>
  </div>
</div>
</template>
<script>
export default {
name: 'edit',
data () {
		  	return {
		  		todo: {},
		  		todo_err:false,
          msg:''
		  	}
		},
  mounted () {
		let data = { id: this.$route.params.id }
	  	this.$store.dispatch('GET_TODO', data).then((res)=> {
	  		if (res.status === "success") {
	  			this.todo = res.data
		  		}
	  	})
	},
methods:{
  	onSubmit(){
  		if (this.todo.name === "") { 
  			this.todo_err = true
  		} else {
  			this.todo_err = false
  		}
  		if(!this.todo_err){
  			let data = { id: this.$route.params.id,name: this.todo.name };

  			this.$store.dispatch('UPDATE_TODO', data).then((res)=> {
	  			if (res.status === "success") {
            this.msg = res.message
            this.$notify({
               group: 'foo',
               title: 'Update message',
               text: 'Updated Successfully!'
                });
	  				this.todo.name = "";
	  			}
	  		});
      }
  	},
	}
}
</script>
<style scoped>
.red_error {
	box-shadow: 0px 0px 5px 2px red;
	border-color: red;
}
.update{
  margin-left:150px;
  margin-right: 150px;
}

</style>