export default function PublicPostGrid({ posts }) {
  return (
    <div className="grid grid-cols-3 gap-[2px] pb-10">
      {posts.map((post) => (
        <div
          key={post.id}
          className="aspect-square bg-muted overflow-hidden"
        >
          <img
            src={post.image}
            alt="post"
            className="h-full w-full object-cover hover:scale-105 transition"
          />
        </div>
      ))}
    </div>
  )
}
