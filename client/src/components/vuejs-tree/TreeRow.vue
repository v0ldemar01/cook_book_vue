<template>
  <li class="node" :data-id="node.id" :style="styles.row">
    <div
      class="row_data"
      :style="styles.row.child"
      @click="toggleEvent('selected', node, 'node', $event)"
    >
      <span
        @click.stop="
          options.events.expanded.state == true &&
            node.nodes != undefined &&
            node.nodes.length > 0 &&
            toggleEvent('expanded', node)
        "
      >
        <i
          v-if="
            options.events.expanded.state == true &&
            node.nodes != undefined &&
            node.nodes.length > 0
          "
          :class="[{ expanded: expanded == true }, styles.expanded.class]"
        >
        </i>
        <span
          v-else-if="
            options.events.expanded.state == true && node.nodes == undefined
          "
          class="small-tree-indent"
        >
        </span>
      </span>
      <i
        v-if="options.events.selected.state == true"
        @click.stop="toggleEvent('selected', node)"
        :class="
          expanded ? styles.selectIcon.active.class : styles.selectIcon.class
        "
        :style="
          selected ? styles.selectIcon.active.style : styles.selectIcon.style
        "
      >
      </i>
      <span
        data-toggle="tooltip"
        data-placement="top"
        :title="node.definition"
        class="capitalize"
        v-bind:class="{ selected: selected }"
        :style="selected ? styles.text.active.style : styles.text.style"
      >
        {{ node.text }}
      </span>
      <span
        v-if="options.cloneNode.state == true"
        @click.stop="options.cloneNode.fn(node)"
        class="icon_parent"
      >
        <i
          v-bind:class="[
            { 'icon-hover': options.cloneNode.appearOnHover },
            styles.cloneNode.class,
          ]"
          :style="styles.cloneNode.style"
        >
        </i>
      </span>
      <span
        v-if="options.deleteNode.state == true"
        @click.stop="options.deleteNode.fn(node)"
        class="icon_parent"
      >
        <i
          v-bind:class="[
            { 'icon-hover': options.deleteNode.appearOnHover },
            styles.deleteNode.class,
          ]"
          :style="styles.deleteNode.style"
        >
        </i>
      </span>
    </div>
    <ul v-if="expanded">
      <tree-row
        v-for="child in node.nodes"
        :ref="'tree-row-' + child.id"
        :custom-options="customOptions"
        :depth="depth + 1"
        :key="child.id"
        :node="child"
        :parent-node="node"
        v-on:emitNodeExpanded="emitNodeExpanded"
        v-on:emitNodeSelected="emitNodeSelected"
      >
      </tree-row>
    </ul>
  </li>
</template>

<script type="text/javascript">
/* eslint-disable vue/no-mutating-props */
/* eslint-disable @typescript-eslint/no-this-alias*/
export default {
  name: "tree-row",
  props: {
    node: {
      type: Object,
      required: true,
    },
    depth: Number,
    customOptions: Object,
    parentNode: Object,
  },
  data() {
    return {
      styles: {
        row: {
          width: "500px",
          cursor: "pointer",
          child: {
            height: "35px",
          },
        },
        expanded: {
          class: "expanded_icon",
        },
        cloneNode: {
          class: "clone_icon",
          style: {
            color: "#007AD5",
          },
        },
        deleteNode: {
          class: "delete_icon",
          style: {
            fontSize: "18px !important",
            color: "#EE5F5B",
          },
        },
        selectIcon: {
          class: "folder_icon",
          style: {
            padding: "5px",
            fontSize: "20px !important",
            color: "#007AD5",
          },
          active: {
            class: "folder_icon_active",
            style: {
              fontSize: "20px !important",
              padding: "5px",
              color: "#2ECC71",
            },
          },
        },
        text: {
          style: {},
          active: {
            style: {
              "font-weight": "bold",
              color: "#2ECC71",
            },
          },
        },
      },
      options: {
        events: {
          expanded: {
            state: true,
            fn: this.toggleExpanded,
          },
          selected: {
            state: true,
            fn: this.toggleSelected,
          },
        },
        cloneNode: { state: true, fn: null, appearOnHover: false },
        deleteNode: { state: true, fn: null, appearOnHover: true },
      },
      expanded: false,
      selected: false,
    };
  },
  watch: {
    expanded() {
      this.node.expanded = this.expanded;
    },
    selected() {
      this.node.selected = this.selected;
    },
  },
  mounted() {
    this.copyOptions(this.customOptions, this.options);
    if (this.node.selectable !== undefined)
      this.options.events.selected.state = this.node.selectable;
    if (this.node.expandable !== undefined)
      this.options.events.expanded.state = this.node.expandable;

    const defaultState = { expanded: false, selected: false };
    this.node.value = { ...defaultState, ...this.node.value };
    this.expanded = this.node.expanded;
    this.selected = this.node.selected;
  },
  methods: {
    toggleEvent(eventType, node) {
      if (this.options.events[eventType].state === true) {
        const fnName = this.options.events[eventType].fn;
        fnName(node, this);
      }
    },
    toggleExpanded(node) {
      this.expanded = !this.expanded;
      this.node.expanded = this.expanded;
      this.$nextTick(() => {
        this.$emit("emitNodeExpanded", node, this.expanded);
      });
    },
    toggleSelected(node) {
      this.selected = !this.selected;
      this.node.selected = this.selected;
      this.$emit("emitNodeSelected", node);
    },
    emitNodeSelected(nodeSelected) {
      // redirect the event toward the Tree component
      this.$emit("emitNodeSelected", nodeSelected);
    },
    emitNodeExpanded(node, state) {
      // redirect the event toward the Tree component
      this.$emit("emitNodeExpanded", node, state);
    },
    recCallNodes(state, event, nodes) {
      const _this = this;
      nodes.forEach((node) => {
        if (!node) node = { ...node, expanded: false, selected: false };
        node[event] = state;
        if (node.nodes) {
          _this.recCallNodes(state, event, node.nodes);
        }
      });
    },
    callNodesDeselect() {
      this.selected = false;
      this.node.selected = this.selected;
      for (let i = 0; i < this.$children.length; i++) {
        this.$children[i].callNodesDeselect();
      }
      if (
        this.$children.length === 0 &&
        this.node.nodes &&
        this.node.nodes.length > 0
      ) {
        this.recCallNodes(false, "selected", this.node.nodes);
      }
    },
    callSpecificChild(arrIds, fname, args) {
      for (let i = 0; i < this.$children.length; i++) {
        let currentNodeId = this.$children[i].$props.node.id;
        if (arrIds.find((x) => x == currentNodeId)) {
          this.$children[i][fname](args);
          return false;
        }
      }
    },
    callNodeSelected(args) {
      const arrIds = args.arrIds;
      const value = args.value;
      if (arrIds[arrIds.length - 1] == this.node.id) {
        this.selected = value;
      } else {
        this.expanded = true;
        this.$nextTick(() => {
          this.callSpecificChild(arrIds, "callNodeSelected", args);
        });
      }
    },
    callNodeExpanded(args) {
      const arrIds = args.arrIds;
      const value = args.value;
      if (value === false && this.expanded === false) return;
      if (arrIds[arrIds.length - 1] != this.node.id) {
        if (value === true) {
          this.expanded = true;
          this.$nextTick(() => {
            this.callSpecificChild(arrIds, "callNodeExpanded", args);
          });
        } else {
          this.callSpecificChild(arrIds, "callNodeExpanded", args);
        }
      } else {
        this.expanded = value;
      }
    },
    copyOptions(src, dst) {
      for (var key in src) {
        if (!dst[key]) {
          dst[key] = src[key];
        } else if (typeof src[key] === "object") {
          this.copyOptions(src[key], dst[key]);
        } else {
          dst[key] = src[key];
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tree-indent {
  margin: 0 10px;
  display: inline-block;
}
.small-tree-indent {
  margin: 0 3px;
  display: inline-block;
}
.icon-hover {
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease-in-out;
}
.row_data:hover .icon-hover {
  visibility: visible;
  opacity: 1;
}
.capitalize {
  font-size: 18px;
  text-transform: capitalize;
}
li {
  margin-left: 0.5rem !important;
  list-style: none;
}
.icon_margin {
  margin: 0 5px 0 0;
}
.icon_parent {
  background: transparent;
  width: 20px;
  height: 20px;
  display: inline-block;
  text-align: center;
  margin: 0px 0 0px 5px;
  i {
    font-size: 16px;
    line-height: 10px;
  }
}
.expanded_icon {
  transform: rotate(0deg);
  transition: all ease 0.2s;
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 8px;
  border-color: transparent transparent transparent #555;
  &.expanded {
    transform: rotate(90deg);
  }
}
.add_icon:before {
  content: "\002b";
}
.clone_icon:before {
  content: "\00270e";
}
.delete_icon:before {
  content: "\00d7";
}
.folder_icon:before {
  content: "\1F5C0";
}
.folder_icon_active:before {
  content: "\1F5C1";
}
</style>
