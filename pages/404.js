import Link from "next/link";

const FourOhFour = () => {
  return (
    <div className="flex justify-center">
      <div>
        <h1>404 - Page Not Found</h1>
        <Link href="/" className="block text-center">Go back home</Link>
      </div>
    </div>
  );
};

export default FourOhFour;
