export default function ContentCard(props: any) {
  return (
    <div className={`${props.className} m-12 bg-gray-50 rounded-2xl p-8`}>{props.children}</div>
  );
}
