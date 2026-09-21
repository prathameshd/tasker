import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"

export default function Settings() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const ss = async () => {
      const tokens = await getAccessTokenSilently();
      console.log("tokens are ", tokens);
    }

    ss();
  }, [])

  return <h1>Settings component loaded</h1>
}
