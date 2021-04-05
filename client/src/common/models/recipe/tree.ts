export interface ITreeNode {
  text: string;
  id: string;
  checkable?: boolean;
  selectd?: boolean;
  expanded?: boolean;
  nodes?: ITreeNode[];
}
