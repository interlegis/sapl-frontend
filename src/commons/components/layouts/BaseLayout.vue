<template>
  <div class="base-layout">
    <header>
      <div class="navigation">
        <slot name="navigation"></slot>
      </div>
      <div class="brand">
          <slot name="brand"></slot>
      </div>
      <div class="header-main">
        <slot name="header-main"></slot>
      </div>
      <div class="header-right">
        <slot name="header-right"></slot>
      </div>
    </header>
    <div class="sideleft">
      <slot name="sideleft"></slot>
    </div>
    <div class="main">
      <slot name="main"></slot>
    </div>
    <div class="sideright">
      <slot name="sideright"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-layout',
  data () {
    return {
    }
  },
  mounted: function () {
    document.querySelector('body').classList.add('body-base-layout')
  }
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap';

.body-base-layout {
  overflow: hidden;
}

.grid-template-columns {
  grid-template-columns: 64px 186px auto 64px;
}

.row-top {
  grid-row-start: 1;
  grid-row-end: 2;
}

.row-middle {
  grid-row-start: 2;
  grid-row-end: 3;
}

.base-layout {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: transparent;
  z-index: $zindex-fixed;
  display: grid;

  @extend .grid-template-columns;
  grid-template-rows: 64px auto;

  header {
    display: grid;

    @extend .grid-template-columns;
    @extend .row-top;
    grid-column-start: 1;
    grid-column-end: 5;

  }

  .sideleft {
    @extend .row-middle;
    grid-column-start: 1;
    grid-column-end: 2;
  }

  .main {
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 4;
    overflow: auto;
  }

  .sideright {
    @extend .row-middle;
    grid-column-start: 4;
    grid-column-end: 5;
  }

  &.left-expand {
    .sideleft {
      grid-column-start: 1;
      grid-column-end: 3;
    }
    .main {
      grid-column-start: 3;
      grid-column-end: 4;
    }
  }
}

$border-color: #ddd;
$padding-space: 1rem;

.base-layout {
  header, .sideright , .sideleft {
    background-color: rgba($color: #f5f5f5, $alpha: 0.98);
  }
  .main {
    background-color: rgba($color: #f0f0f0, $alpha: 0.7);
  }
  header {
    border-bottom: 1px $border-color solid;
  }
  .sideright {
    border-left: 1px $border-color solid;
  }
}

.base-layout {
  .main {
    text-align: justify;
    padding: $padding-space;
    padding-bottom: 0;
  }
}

</style>
