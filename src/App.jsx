/** @jsx h */
import { h, ref } from "https://esm.sh/vue@3.2.41"

export default {
    setup() {
      const counter = ref(0);
      const inc = () => counter.value++;
      return () => <button onClick={inc}>{counter.value}</button>
    }
}