import * as Types from "@this/types";
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import { Store } from "./Store";
import * as TreeNode from "./TreeNode";

const getTransform = (position: { x: number; y: number }) => {
  return `translate(${position.y}, ${position.x})`;
};

const generateProps = (store: Store, node: Types.Node): TreeNode.Props => {
  const position = {
    x: node.x * store.scale.x + store.scale.offsetX,
    y: node.y * store.scale.y + store.scale.offsetY,
  };
  return {
    g: {
      transform: getTransform(position),
    },
    circle: {
      r: store.radius,
    },
    text: {
      dx: store.radius + 0.5,
      dy: store.offset,
      onClick: () => {
        store.updateKey(node.data.name);
      },
      children: node.data.name,
    },
  };
};

export const Container = ({ store }: { store: Store; children?: React.ReactNode }) =>
  useObserver(() => (
    <>
      {store.nodes.map((node, idx) => {
        return <TreeNode.Component {...generateProps(store, node)} key={`node-${idx}`} />;
      })}
    </>
  ));
