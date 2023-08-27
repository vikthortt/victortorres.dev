<script lang="ts" setup>
import {ref, watch} from 'vue'
import { useMediaQuery } from '@vueuse/core'

type NavigationMenuProps = {
  current: string
}
const { current } = defineProps<NavigationMenuProps>()

const routes = [
  {name: 'about', link: '/about', label: 'About'},
  {name: 'resources', link: '/resources', label: 'Resources'},
]

const isLargeScreen  = useMediaQuery('(min-width: 720px)')
const showNav = ref(false)

watch(isLargeScreen, () => {
  showNav.value = false
})

const toggleNav = () => {
  showNav.value = !showNav.value
}

</script>

<template>
  <nav v-if="isLargeScreen">
    <ul class="desktop-nav">
      <li v-for="route in routes" class="nav-link" :class="{ selected: route.name === current}" >
        <a :href="route.link">
          {{ route.label }}
        </a>
      </li>
    </ul>
  </nav>
  <div v-if="!isLargeScreen" class="toggler">
    <button @click="toggleNav">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="9" width="20" height="2" rx="1" transform-origin="0px 0px" style="transform: none; transform-origin: 0px 0px;"></rect>
        <rect x="6" y="15" width="20" height="2" rx="1" opacity="1"></rect>
        <rect x="6" y="21" width="20" height="2" rx="1" transform-origin="0px 0px" style="transform: none; transform-origin: 0px 0px;"></rect>
      </svg>
    </button>
  </div>

  <div class="mobile-nav-container" v-if="!isLargeScreen && showNav">

    <header class="content">
      <h2>
        <a href="/">
          <svg viewBox="0 0 46.666666666666664 29.571848081641757" height="18">
            <g transform="translate(-3.9010617238508734, -10.854996832994203) scale(0.672469448032154)" fill="#00b8a9">
              <path d="M38.496 40.078 l-11.25 20.039 l-14.15 0 l-2.0801 -20.039 l-2.6953 0 l-2.5195 -23.936 l15.322 0 l1.7871 21.123 c3.9551 -6.9434 7.5293 -14.209 11.455 -21.123 l14.941 0 l-13.447 23.936 l2.6367 0 z M60.75476953125 40.078 l-4.4531 20.039 l-14.854 0 l4.5703 -20.039 l-2.666 0 l2.959 -12.832 l-11.719 0 l2.5781 -11.104 l38.027 0 l-2.4902 11.104 l-11.689 0 l-2.8711 12.832 l2.6074 0 z"></path>
            </g>
          </svg>
          <span>
            Victor Torres
          </span>
        </a>
      </h2>

      <div class="toggler">
        <button @click="toggleNav">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="9" width="20" height="2" rx="1" transform-origin="16px 10px" style="transform: translateY(7px) rotate(45deg); transform-origin: 16px 10px;"></rect>
            <rect x="6" y="15" width="20" height="2" rx="1" opacity="0"></rect>
            <rect x="6" y="21" width="20" height="2" rx="1" transform-origin="16px 22px" style="transform: translateY(-5px) rotate(-45deg); transform-origin: 16px 22px;"></rect>
          </svg>
        </button>
      </div>

    </header>

    <nav>
      <ul class="mobile-nav">
        <li v-for="route in routes" class="nav-link" :class="{ selected: route.name === current}" >
          <a :href="route.link">
            {{ route.label }}
          </a>
        </li>
      </ul>
    </nav>
  </div>

</template>

<style scoped>

nav {
  align-items: center;
  display: flex;
  flex: 1;
  font-weight: 700;
  justify-content: flex-end;
  text-transform: uppercase;
}

.desktop-nav {
  list-style: none;
  display: flex;
}

.nav-link {
  color: var(--text-links-color);
  text-decoration: none;
  font-style: normal;
  padding: 10px 5px;
  display: block;
  position: relative;
  margin-left: 20px;
  min-width: 70px;
  text-align: center;
}

.nav-link:not(.selected) {
  opacity: 0.7;
}

.nav-link::before {
  content: '';
  position: absolute;
  transition: transform .3s ease;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--text-links-color);
  transform: scaleX(0);
}

.nav-link:hover::before,
.selected::before {
  transform: scaleX(1);
}

.selected::before {
  background: var(--text-links-color);
}

.toggler {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
}

.toggler button {
  background: none;
  border-style: solid;
  border-width: 1px;
  border-color: var(--text-links-color);
  border-radius: 4px;
  cursor: pointer;
}

.toggler button svg {
  fill: var(--text-links-color);
}

.mobile-nav-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  background: var(--secondary-background-color);
}

.mobile-nav {
  width: 100%;
  height: 100vh;
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.mobile-nav li {
  text-align: center;
  margin: 0;
  padding: 0;
  border-bottom: solid 1px var(--text-links-color);
}

.mobile-nav li a {
  padding: 2em;
  width: 100%;
  display: inline-block;
}

header {
  display: flex;
  margin: 0 auto;
  padding: 2em 0;
}

h2 {
  min-width: 225px;
}

h2 a {
  color: var(--text-header-color);
  text-decoration: none;
  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;

  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

h2 a span {
  margin-left: 8px;
  border-left-color: var(--text-header-color);
  border-left-width: 3px;
  border-left-style: solid;
  padding-left: 8px;
}

</style>