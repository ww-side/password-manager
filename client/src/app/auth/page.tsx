// Core
import { Toaster } from "react-hot-toast";

// Components
import AuthForm from "../../components/AuthForm";

export default function Auth() {
  return (
    <main>
      <Toaster position="bottom-left" reverseOrder={false} />
      <AuthForm />
    </main>
  );
}
