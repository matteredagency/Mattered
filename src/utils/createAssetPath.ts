export default function createAssetPath(path: string) {
  return `.${process.env.NODE_ENV ? "" : "/assets"}${path}`;
}
