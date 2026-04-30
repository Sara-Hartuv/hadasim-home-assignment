import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { managerLogin, teacherLogin } from "../api/authApi";
import { useAuth  } from "../context/AuthContext";
import type { UserRole} from "../types/auth";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [role, setRole] = useState<UserRole>("teacher");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{
            setError("");
            setIsLoading(true);

            const result = role === "manager" ? await managerLogin(username, password): await teacherLogin(username, password);
            login(result.token, result.role, result.idNumber, result.className);
            if (result.role === "manager") {
                navigate("/manager");
            } else {
                navigate("/teacher");
            }
        } catch {
            setError("פרטי ההתחברות אינם תקינים");
        } finally {
            setIsLoading(false);
        }
    };
return (
  <div
    dir="rtl"
    className="flex min-h-screen items-center justify-center bg-slate-100 px-4"
  >
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-red-600 shadow-lg" />
        <h1 className="text-3xl font-bold text-slate-950">התחברות למערכת</h1>
        <p className="mt-2 text-sm font-medium text-cyan-700">
          מערכת ניהול טיול · בנות משה
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-semibold text-slate-700">סוג משתמש</span>
          <select
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
          >
            <option value="teacher">מורה</option>
            <option value="manager">מנהל</option>
          </select>
        </label>

        {role === "manager" ? (
          <>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">שם משתמש</span>
              <input
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">סיסמה</span>
              <input
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </>
        ) : (
          <>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">שם מלא</span>
              <input
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-700">תעודת זהות</span>
              <input
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </>
        )}

        {error && <p className="text-sm font-medium text-red-600">{error}</p>}

        <Button
          className="w-full rounded-2xl bg-red-600 py-6 text-base font-bold text-white hover:bg-red-700"
          disabled={isLoading}
        >
          {isLoading ? "מתחבר..." : "התחברות"}
        </Button>
      </form>
    </div>
  </div>
);
};
export default LoginPage;