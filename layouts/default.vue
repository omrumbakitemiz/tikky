<template>
  <div class="space-y-6 p-10 pb-16 block">
    <div class="flex justify-between">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">Tikky 💸</h2>
        <p class="text-muted-foreground">Pay Friends Easily: Your Bill Sharing Solution!</p>
      </div>

      <ThemeToggle />
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col space-y-8">
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
