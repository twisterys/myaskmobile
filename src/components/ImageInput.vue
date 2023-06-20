<script setup >
defineProps( {
  inputId:String
})


const changeHandler = (e)=>{
  const inputValue = e.target.value;
  if ( inputValue !== "" ){
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        continue;
      }
      const img = document.createElement("img");
      img.classList.add("obj");
      img.file = file;
      e.target.parent.children[0].innerHTML = "";
      e.target.parent.children[0].appendChild(img);
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
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
  margin: 1.5rem 0;

}

input {
  width: 100%;
  height: 300px;
  appearance: none;
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
  color: white;
  background-color: var(--blue-color-400);
  padding: .5rem;
}
</style>