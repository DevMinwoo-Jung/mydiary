export type PostObject = {
  content: string;
  id: string;
  date: string;
  Images: []
}

export type PostProps = {
  post: PostObject
}