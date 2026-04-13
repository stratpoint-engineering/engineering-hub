import { auth, signIn, signOut } from "@/auth"

export default async function AuthButton() {
  const session = await auth()

  if (session?.user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name ?? ""}
            style={{ height: "28px", width: "28px", borderRadius: "50%" }}
          />
        )}
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <button
            type="submit"
            style={{
              fontSize: "13px",
              padding: "4px 10px",
              borderRadius: "6px",
              border: "1px solid currentColor",
              cursor: "pointer",
              opacity: 0.7,
            }}
          >
            Sign out
          </button>
        </form>
      </div>
    )
  }

  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button
        type="submit"
        style={{
          fontSize: "13px",
          padding: "4px 12px",
          borderRadius: "6px",
          border: "1px solid currentColor",
          cursor: "pointer",
          opacity: 0.85,
        }}
      >
        Sign in
      </button>
    </form>
  )
}
