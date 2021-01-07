import {StorageDescriptor} from "@/data_models/types";
<template>
  <b-card>
    <b-card-header class="border-0 m-0 p-0">
      <b> {{this.activity.user.name + " " + this.activity.user.lastName}} </b>
    </b-card-header>
    <b-card-body v-if="isComment()" class="border-0 m-0 p-0">
      <b-button v-show="!isEditing" v-text="activity.content"
                class="text-truncate text-nowrap btn border-0 bg-transparent h2 text-dark m-0 p-0 font-weight-bold"
                @click="edit($event)">
      </b-button>
      <b-form v-show="isEditing && isUserACommentCreator()" @focusout="onActivitySubmit($event)" @submit.prevent="onActivitySubmit($event)">
        <b-form-input type="text" class="mr-1" v-model="activity.content" ref="activityContent"
                      style="max-width: 150px;"/>
      </b-form>
    </b-card-body>
    <b-card-body v-else-if="isLog()" class="border-0 m-0 p-0">
      {{this.activity.content}}
    </b-card-body>
    <b-card-footer class="border-0 m-0 p-0 ">
      {{formatDate(this.activity.createdOn)}}
    </b-card-footer>
  </b-card>
</template>

<script lang="ts">
  import {ActivityModel, StorageDescriptor} from "@/data_models/types";
  import {Component, Prop, Vue} from "vue-property-decorator";
  import {BFormInput} from "bootstrap-vue";
  import {editComment} from "@/utils/db_operations/activities";
  import {getFromStorage} from "@/store";

  @Component
  export default class ActivityComponent extends Vue {
    @Prop() activity!: ActivityModel;

    private isEditing: boolean = false;
    private content: string = '';

    edit(event: Event) {
      this.isEditing = true;
      this.content = String(this.activity.content);
      this.$nextTick(() => {
        const elem: BFormInput = <BFormInput>this.$refs.activityContent;
        elem.focus();
        console.log(elem);
      })
    }

    onActivitySubmit(event: Event) {
      event.preventDefault();
      this.isEditing = false;
      console.log(this.activity.content);

      if (this.activity.content == undefined || this.activity.content === "") {
        this.activity.content = this.content;
      }

      if(this.activity.content === this.content) {
        this.content = "";
        return;
      }
      this.content = "";
      this.updateActivity();
    }

    isLog() {
      // return this.activity.type === ActivityModelType.ACTIVITY_LOG_VAL
      return this.activity.type.toString() === 'A_1'
    }

    isComment() {
      // return this.activity.type === ActivityModelType.COMMENT_VAL
      return this.activity.type.toString() === 'A_2'
    }

    isUserACommentCreator() {
      let ser = getFromStorage('active-user', StorageDescriptor.local);
      if(ser === null) {
        console.log("ActivityComponent something went wrong");
        return;
      }
      return this.activity.user.id === ser.id
    }

    private updateActivity() {
      editComment({activity_id: this.activity.id, content: this.activity.content}, data => {
        this.activity.content = data.activity.content
      }, error => {
        console.log(error)
      })
    }

    private formatDate(date: string) {
      let d = new Date(date);
      return d.toLocaleString('default', {month: 'short'}) + ' '
        + d.getDay() + ', ' + d.getFullYear() + ' at '
        + d.getUTCHours() + ':' + d.getUTCMinutes();
    }
  }

</script>
