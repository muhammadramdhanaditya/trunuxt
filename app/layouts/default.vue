<template>
  <el-container class="h-screen dark:bg-zinc-900 bg-white">
    <Navbar />
    <el-container>
      <el-container>
        <el-main class="dark:bg-black bg-white">
          <slot />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
