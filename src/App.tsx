import * as React from "react";

import { Dendrogram, Menu } from "./components";
import * as Tools from "./generator";
import { Package, TreeData } from "./types";

const styles = require("./style.scss");

interface AppProps {
  raw: Package;
}

interface AppState {
  raw: Package;
  key: string;
}

const getClassNames = (className: string): string => {
  return className
    .split(" ")
    .map(name => styles[name])
    .join(" ");
};

class App extends React.Component<AppProps, AppState> {
  private npmUrl: string = "https://www.npmjs.com/package/npm-run-script-chain";
  constructor(props: AppProps) {
    super(props);
    this.state = {
      raw: props.raw,
      key: "build",
    };
    this.updateKey = this.updateKey.bind(this);
  }
  public render() {
    const menuStore = Menu.generateStore(this.state.raw, this.state.key, this.updateKey);
    const treeData = this.getTreeData();
    return (
      <>
        <nav className={getClassNames("navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow")}>
          <a className={getClassNames("navbar-brand col-sm-3 col-md-2 mr-0")} href={this.npmUrl} target="_blank" rel="noopener">
            npm-run-script-chain
          </a>
        </nav>
        <div className={styles.containerFluid}>
          <div className={styles.row}>
            <nav className={getClassNames("col-md-2 d-none d-md-block bg-light sidebar")}>
              <div className={styles["sidebar-sticky"]}>
                <Menu.Container store={menuStore} />
              </div>
            </nav>
            <main className={getClassNames("col-md-9 ml-sm-auto col-lg-10 px-4")}>
              <div
                className={getClassNames(
                  "d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom",
                )}
              >
                <h1 className={styles.h2}>{this.state.key}</h1>
              </div>
              {treeData && <Dendrogram.Component {...{ data: treeData, updateKey: this.updateKey }} />}
            </main>
          </div>
        </div>
      </>
    );
  }
  private updateKey(key: string): void {
    this.setState({
      key,
    });
  }
  private getTreeData(): TreeData | undefined {
    return Tools.generateTreeData(this.state.key, this.props.raw);
  }
}

export { AppProps as Props, App as Component };
