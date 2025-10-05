
export default async function AuthorPage({params} : {params: Promise<{ id: string }>}) {
    const {id} = await params
  return (
    <div>{id}</div>
  )
}
