import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-600"
      } py-6 mt-12`}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          Developed by{" "}
          <span className="font-semibold text-blue-500">Devi's Father 😎</span>
        </p>
      </div>
    </footer>
  );
}
