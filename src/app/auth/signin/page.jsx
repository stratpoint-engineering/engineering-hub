import { signIn } from "@/auth"
import GoogleSignInButton from "@/components/GoogleSignInButton"

export const metadata = {
  title: "Sign In — Stratpoint Engineering Hub",
}

export default async function SignInPage({ searchParams }) {
  const params = await searchParams
  const callbackUrl = params?.callbackUrl ?? "/"
  const error = params?.error

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      backgroundColor: "var(--bg-main)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-sans)",
    }}>

      {/* Card */}
      <div style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 1rem",
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}>

        {/* Logo */}
        <img
          src="/stratpoint_icon.svg"
          alt="Stratpoint"
          style={{ height: "52px", width: "auto", marginBottom: "1.25rem" }}
        />

        {/* Heading */}
        <h1 style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "var(--text-primary)",
          letterSpacing: "-0.025em",
          margin: "0 0 0.375rem",
          textAlign: "center",
        }}>
          Engineering Hub
        </h1>

        <p style={{
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          margin: "0 0 2rem",
          textAlign: "center",
          lineHeight: 1.6,
        }}>
          Sign in to access Stratpoint&apos;s internal<br />engineering resources.
        </p>

        {/* Error banner */}
        {error && (
          <div style={{
            width: "100%",
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            border: "1px solid rgba(239, 68, 68, 0.25)",
            borderRadius: "8px",
            padding: "0.625rem 0.875rem",
            marginBottom: "1.25rem",
            fontSize: "0.8rem",
            color: "#dc2626",
            textAlign: "center",
          }}>
            {error === "AccessDenied"
              ? "Access restricted to @stratpoint.com accounts."
              : "Something went wrong. Please try again."}
          </div>
        )}

        {/* Google sign-in */}
        <form
          action={async () => {
            "use server"
            await signIn("google", { redirectTo: callbackUrl })
          }}
          style={{ width: "100%" }}
        >
          <GoogleSignInButton />
        </form>

        {/* Domain notice */}
        <p style={{
          fontSize: "0.72rem",
          color: "var(--text-muted)",
          margin: "1.5rem 0 0",
          textAlign: "center",
          lineHeight: 1.6,
        }}>
          Access is restricted to{" "}
          <span style={{ fontFamily: "var(--font-mono)", fontWeight: 500 }}>
            @stratpoint.com
          </span>{" "}
          accounts.
        </p>
      </div>

      {/* Footer */}
      <p style={{
        marginTop: "2rem",
        fontSize: "0.72rem",
        color: "var(--text-muted)",
      }}>
        &copy; {new Date().getFullYear()} Stratpoint Technologies, Inc.
      </p>
    </div>
  )
}
