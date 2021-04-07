export interface ITreeNode {
  text: string;
  id: string;
  checkable?: boolean;
  selected?: boolean;
  expanded?: boolean;
  nodes?: ITreeNode[];
}
