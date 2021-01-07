
<template>
  <div>
  <div>
    <b-button variant="primary" v-b-modal.modal-t-tag type="button">Tags</b-button>
  </div>

    <b-modal id="modal-t-tag" title="Tags">
      <p class="my-4">{{this.tagColor}}</p>
          <b-dropdown v-for="tagN in tags" id="dropdown-1" text="Choose tag" class="m-md-2">
            <b-dropdown-item><b-badge :variant="this.tagsMap.get(tagN)">{{tagN}}</b-badge></b-dropdown-item>
          </b-dropdown>

          <b-form>
            <b-form-group @submit.prevent="handle">
              <b-form-input id="name-input" v-model="tagName" type="url" required></b-form-input>
              <b-form-input v-model="tagColor" type="color"></b-form-input>
              <b-button variant="primary" @click="addTag">Add tag</b-button>
            </b-form-group>

          </b-form>
    </b-modal>
  </div>
</template>

<script lang="ts">

import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class Tags extends Vue{
  private tagName = ""
  private tagColor = ""
  private tagsMap = new Map<string, string>([["Important","#678727"]]);
  private tags: Array<string> = ["Important"]

  handle() {
    console.debug('reeeeeee')
  }
  modalOk(evt: Event) {
    this.handle();
  }
  addTag() {
    this.tags.push(this.tagName);
    this.tagsMap.set(this.tagName, this.tagColor);
    this.tagName = ""
    this.tagColor = ""
  }
}
</script>


