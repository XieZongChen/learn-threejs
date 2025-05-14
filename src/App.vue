<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Graphical } from './graphical';
import { TestStage } from './stages/testStage';

const graph = new Graphical();

onMounted(() => {
  const dom = document.querySelector('#content');
  if (!dom) return;
  graph.initialize({ dom });
  graph.playStage(TestStage, { setMsg });
});

const msg = ref('');

const setMsg = (message: string) => {
  msg.value = message;
};

const jumpBox = (color: string) => {
  (graph.curStage as any)?.jumpBox(color);
};
</script>

<template>
  <div>
    <div id="main">
      <div id="content"></div>
      <div id="operate" class="operate">
        <button @click="jumpBox('red')">red</button>
        <button @click="jumpBox('green')">green</button>
        <button @click="jumpBox('blue')">blue</button>
        <p>{{ msg }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#content {
  width: 100%;
  height: 100vh;
}
.operate {
  position: absolute;
  top: 0;
  right: 0;
  background-color: #fff;
  padding: 20px;
}
</style>
