import { useRouter } from "next/router";

function Admin() {
  const router = useRouter();
  const { clubname } = router.query;

  return (
    <div>
      <h1>Admin page of {clubname}</h1>
    </div>
  );
}

Admin.auth = true;

export default Admin;