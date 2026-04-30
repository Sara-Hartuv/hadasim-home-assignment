import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { managerLogin, teacherLogin } from "../api/authApi";
import { useAuth  } from "../context/AuthContext";
import type { UserRole} from "../types/auth";

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
            login(result.token, result.role, result.idNumber);
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
        <div dir="rtl" style={{maxWidth: "400px", margin: "80px auto"}}>
            <h1>התחברות למערכת</h1>
            <form onSubmit={handleLogin}>
                <label>
                    סוג משתמש:
                    <select value={role} onChange={(e) => setRole(e.target.value as UserRole)}>
                        <option value="teacher">מורה</option>
                        <option value="manager">מנהל</option>
                    </select>
                </label>
                {role === "manager"? (
                    <>
                        <label>
                            שם משתמש:
                            <input value={username} onChange={(e) => setUsername(e.target.value)}/>
                        </label>
                        <label>
                            סיסמה:
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </label>
                    </>
                ) : (
                    <>
                        <label>
                            שם מלא:
                            <input value={username} onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label>
                            תעודת זהות:
                            <input value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </>
                )}
                {error && <p style={{color: "red"}}>{error}</p>}
                <button disabled={isLoading}>
                    {isLoading?"מתחבר...":"התחברות"}
                </button>
            </form>
        </div>
    );

};
export default LoginPage;