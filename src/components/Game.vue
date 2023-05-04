<section class="section flex flex-col items-center gap-3">
<small>Current click</small>
<h1 class="text-5xl font-medium">{{ count.count }}</h1>
<div class="flex gap-4 mt-3">
  <button @click="count.click()" class="btn-count">Click++</button>
  <button @click="count.doubleClick()" class="btn-count">Click * 2</button>
</div>
</section>
