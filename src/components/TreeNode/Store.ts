import * as Domain from "@domain";
import * as Types from "@this/types";

export interface Store {
  updateKey: (key: string) => void;
  radius: number;
  text: {
    offset: number;
  };
  position: {
    scale: {
      x: number;
      y: number;
    };
    offset: {
      x: number;
      y: number;
    };
  };
  nodes: Types.Node[];
  canShow: boolean;
}

export const generateStore = (domainStores: Domain.Stores): Store => ({
  updateKey: (key: string) => {
    domainStores.app.dispatch({
      type: "UPDATE_KEY",
      currentKey: key,
    });
  },
  position: {
    scale: {
      x: domainStores.dendrogram.state.size.height,
      y: domainStores.dendrogram.state.size.width / 1.5,
    },
    offset: {
      x: 0,
      y: domainStores.dendrogram.state.size.width / 7,
    },
  },
  radius: domainStores.dendrogram.state.radius,
  text: {
    offset: domainStores.dendrogram.state.radius / 2,
  },
  nodes: domainStores.app.state.nodes,
  canShow: !isNaN(domainStores.dendrogram.state.size.width) && !isNaN(domainStores.dendrogram.state.size.height),
});
