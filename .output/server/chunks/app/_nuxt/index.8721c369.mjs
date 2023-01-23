import { d as defineStore } from '../server.mjs';
import { useSSRContext } from 'vue';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'vue/server-renderer';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'express';
import 'yahoo-fantasy';
import 'http-proxy-middleware';

const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: null,
      players: []
    };
  },
  actions: {
    async login() {
      await $fetch("/api/express/auth/yahoo").then((response) => {
        if (response.status !== 200) {
          throw new Error(response.status);
        }
        return response.json();
      }).then((data) => {
        console.log(data);
      }).catch((e) => {
        console.log(e);
        console.log("user not authenticated");
      });
      this.user = "me";
    }
  }
});
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><h1>My Fantasy Playbook</h1><button>Login</button><iframe src="/api/express/yahoo/league/standings" frameborder="0"></iframe><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.8721c369.mjs.map
