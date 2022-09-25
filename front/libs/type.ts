export type PostObject = {
  content: string;
  id: string;
  date: string;
  Images: []
}

export type PostProps = {
  post: PostObject
  modify?: boolean
}

export type ToggleProps = {
  isOpened: boolean,
  toggleDrawer: (closed:boolean) => void,
}