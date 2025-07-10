import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppContext } from "@/context/Appcontext";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

const Modal = ({onOpen}) => {
  const { axios, navigate, setToken } = useAppContext();
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        navigate("/");
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setOpen(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => {
          setOpen(true);
          onOpen?.(); // This will close the navbar when Modal opens
        }}
        className="font-semibold cursor-pointer px-8 py-2 bg-primary-second hover:bg-primary-dull transition-all text-white rounded-lg"
      >
        Login
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">
            {state !== "login" ? "Sign Up" : "Login"}
          </DialogTitle>
          <DialogDescription className="text-[15px]">
            Please enter your credentials to continue.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={onSubmitHandler}
          onClick={(e) => e.stopPropagation()}
        >
          {state === "register" && (
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full border border-gray-300 rounded-md p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full border border-gray-300 rounded-md p-2.5 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-600">
            {state === "register" ? (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setState("login")}
                  className="text-primary-second cursor-pointer hover:underline"
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setState("register")}
                  className="text-primary-second cursor-pointer hover:underline"
                >
                  register here
                </span>
              </>
            )}
          </p>
          <button
            disabled={loading}
            type="submit"
            className="w-full flex items-center gap-2 justify-center bg-primary-second hover:bg-primary-dull text-white font-semibold py-2.5 rounded-md transition-all"
          >
            {/* {state === "register" ? "Create Account" : "Login"} */}
            {loading ? (
              <>
                Loading
                <LoaderCircle
                  className="w-5 h-5 animate-spin text-white"
                  strokeWidth={3}
                />
              </>
            ) : state === "register" ? (
              "Create Account"
            ) : (
              "Login"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
