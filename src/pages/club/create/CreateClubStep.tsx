export default function CreateClubStep({
  children,
  stepText,
}: {
  children: React.ReactNode;
  stepText: string;
}) {
  return (
    <div className="mb-8 grid-cols-1 p-4 dark:bg-gray-800 border shadow-md border-gray-200 dark:border-gray-700 rounded-lg">
      <h2 className="dark:text-white text-3xl font-bold mb-4">
        {stepText}
      </h2>
      {children}
    </div>
  );
}
