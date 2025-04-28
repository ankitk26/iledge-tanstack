import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col justify-center items-center">
      <AlertTriangle className="size-32" />
      <h1 className="text-xl font-semibold text-center">Page not found</h1>
    </div>
  );
}
