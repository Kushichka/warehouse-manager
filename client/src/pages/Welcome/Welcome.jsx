import { Link } from "react-router-dom"

export const Welcome = () => {
  return (
    <>
        <Link to='login'>
            Log In
        </Link>

        <Link to='registration'>
            Sign up
        </Link>
    </>
  )
}
