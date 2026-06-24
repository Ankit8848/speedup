import { type ReactNode } from "react";
import { Switch, Route, Redirect } from "wouter";
import { Loader2 } from "lucide-react";
import { AuthProvider, useAuth } from "./AuthContext";
import { AdminLayout } from "./AdminLayout";
import LoginPage from "./LoginPage";
import ContentEditor from "./ContentEditor";
import MediaLibrary from "./MediaLibrary";
import UsersAdmin from "./UsersAdmin";

function Gate({ children, superAdmin = false }: { children: ReactNode; superAdmin?: boolean }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center" style={{ background: "#F4F6FA" }}>
        <Loader2 className="w-6 h-6 animate-spin text-[#FF5500]" />
      </div>
    );
  }
  if (!user) return <Redirect to="/login" />;
  if (superAdmin && user.role !== "super_admin") return <Redirect to="/content" />;

  return <AdminLayout>{children}</AdminLayout>;
}

// Paths are relative to the nested router's /admin base (see App.tsx).
function AdminRoutes() {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />

      <Route path="/content/:key">
        {(params) => (
          <Gate>
            <ContentEditor sectionKey={params.key} />
          </Gate>
        )}
      </Route>
      <Route path="/content">
        <Gate>
          <ContentEditor />
        </Gate>
      </Route>

      <Route path="/media">
        <Gate>
          <MediaLibrary />
        </Gate>
      </Route>

      <Route path="/users">
        <Gate superAdmin>
          <UsersAdmin />
        </Gate>
      </Route>

      <Route>
        <Redirect to="/content" />
      </Route>
    </Switch>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <AdminRoutes />
    </AuthProvider>
  );
}
