<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NLayout, NLayoutSider, NMenu, type MenuOption } from 'naive-ui';
import { Graphical } from './graphical';
import { PerspectiveCameraStage } from './stages/perspectiveCameraStage';

const menuOptions: MenuOption[] = [
  {
    label: '透视相机与视锥体',
    key: 'PerspectiveCameraStage',
  },
];

const graph = new Graphical();

onMounted(() => {
  const dom = document.querySelector('#content');
  if (!dom) return;
  graph.initialize({ dom });
  graph.playStage(PerspectiveCameraStage);
});

</script>

<template>
  <div>
    <n-layout has-sider>
      <div class="layout-left">
        <div class="project-title">Learn Three.js</div>
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
        >
          <n-menu
            default-value="PerspectiveCameraStage"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
          />
        </n-layout-sider>
      </div>

      <n-layout>
        <div id="content" class="content"></div>
      </n-layout>
    </n-layout>
  </div>
</template>

<style scoped>
.layout-left {
  display: flex;
  flex-direction: column;
}

.project-title {
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #eaeaea;
}

.content {
  width: 100%;
  height: 100vh;
}
</style>
