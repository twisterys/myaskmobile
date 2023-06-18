<script setup >
defineProps( {
  inputId:String
})


const changeHandler = (e)=>{
  const inputValue = e.target.value;
  if ( inputValue !== "" ){
    console.log(inputValue)
  }
}
</script>

<template>
  <div   class="input-card">
    <div class="preview">
      <label @click="$event.target.children[1].click()" :for="'#'+inputId">
        <figure>
          <img src="../assets/CameraPlaceHolder.png" alt="">
        </figure>
        <input :id="inputId"  @change="changeHandler($event)"  type="file" accept="image/" capture="user" hidden >
      </label>
    </div>
    <div class="footer">
      file name
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input-card {
  border-radius: var(--global-border-radius);
  overflow: clip;
  box-shadow: var(--global-shadow);

}

input {
  width: 100%;
  height: 300px;
  appearance: none;
  background-image: url("../assets/CameraPlaceHolder.png") ;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
label figure {
  pointer-events: none;
  width: 100%;
  height: 200px;
  overflow: clip;
  img {
    width: 100%;
    display: block;
    pointer-events: none;
  }
}
.footer {
  background-color: var(--blue-color-400);
  padding: .5rem;
}
</style>